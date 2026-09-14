/**
 * Opens the built Storybook in a real browser and checks that the styling
 * arrived: the font, the tokens, a painted button, a bordered input, a dark
 * palette that differs from the light one.
 *
 * Every other gate checks structure without rendering a pixel, so all of
 * them stayed green while every component rendered unstyled. This one says
 * "styled", never "styled exactly like this": no golden images, nothing to
 * update when a token changes.
 *
 * Run after `pnpm build-storybook` — it serves that build's output.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(import.meta.dirname, "..");
const STATIC = join(root, "storybook-static");

const die = (message) => {
	console.error(`\n  ${message}\n`);
	process.exit(1);
};

if (!existsSync(join(STATIC, "index.json"))) {
	die("No storybook-static/index.json. Run `pnpm build-storybook` first.");
}

const TYPES = {
	".html": "text/html",
	".js": "text/javascript",
	".mjs": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
	".woff": "font/woff",
	".png": "image/png",
};

const server = createServer((req, res) => {
	const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
	const file = join(STATIC, path === "/" ? "index.html" : path);
	if (
		!file.startsWith(STATIC) ||
		!existsSync(file) ||
		statSync(file).isDirectory()
	) {
		res.writeHead(404);
		res.end();
		return;
	}
	res.writeHead(200, {
		"content-type": TYPES[extname(file)] ?? "application/octet-stream",
	});
	res.end(readFileSync(file));
});
await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
const origin = `http://127.0.0.1:${server.address().port}`;

const index = JSON.parse(readFileSync(join(STATIC, "index.json"), "utf8"));
const known = new Set(Object.keys(index.entries ?? {}));

const TRANSPARENT = new Set(["rgba(0, 0, 0, 0)", "transparent"]);

const CHECKS = [
	{
		story: "primitives-button--variants",
		name: "a button is painted, rounded, and set in Geist",
		run: async (page) => {
			const button = page.locator("#storybook-root button").first();
			const s = await button.evaluate((el) => {
				const c = getComputedStyle(el);
				return {
					background: c.backgroundColor,
					radius: Number.parseFloat(c.borderRadius),
					font: c.fontFamily,
				};
			});
			const loaded = await page.evaluate(async () => {
				await document.fonts.ready;
				return [...document.fonts].some(
					(face) => /Geist/.test(face.family) && face.status === "loaded",
				);
			});
			return [
				[!TRANSPARENT.has(s.background), `background is ${s.background}`],
				[s.radius > 0, `border-radius is ${s.radius}px`],
				[/Geist/.test(s.font), `font-family is ${s.font}`],
				[loaded, "no Geist face reached status loaded"],
			];
		},
	},
	{
		story: "components-appalert--destructive",
		name: "a destructive alert is not black on white",
		run: async (page) => {
			const title = page.locator("#storybook-root [data-slot=alert-title]");
			const color = await title.evaluate((el) => getComputedStyle(el).color);
			return [[color !== "rgb(0, 0, 0)", `title colour is ${color}`]];
		},
	},
	{
		story: "primitives-field--default",
		name: "an input has a border",
		run: async (page) => {
			const input = page.locator("#storybook-root input").first();
			const s = await input.evaluate((el) => {
				const c = getComputedStyle(el);
				return {
					style: c.borderStyle,
					width: Number.parseFloat(c.borderWidth),
				};
			});
			return [
				[
					s.style !== "none" && s.width > 0,
					`border is ${s.width}px ${s.style}`,
				],
			];
		},
	},
	{
		story: "primitives-button--variants",
		name: "the dark class changes the tokens",
		run: async (page) => {
			const token = () =>
				page.evaluate(() =>
					getComputedStyle(document.documentElement)
						.getPropertyValue("--background")
						.trim(),
				);
			const light = await token();
			await page.evaluate(() => document.documentElement.classList.add("dark"));
			const dark = await token();
			return [
				[light.length > 0, "--background is empty in light"],
				[dark.length > 0, "--background is empty in dark"],
				[light !== dark, `--background is ${light} in both`],
			];
		},
	},
];

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const failures = [];
let assertions = 0;

for (const check of CHECKS) {
	if (!known.has(check.story)) {
		failures.push(`${check.story}: not in the built index`);
		continue;
	}
	const page = await browser.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(`${origin}/iframe.html?id=${check.story}&viewMode=story`, {
		waitUntil: "load",
	});
	await page.waitForSelector("#storybook-root > *", { timeout: 15000 });
	for (const [ok, detail] of await check.run(page)) {
		assertions += 1;
		if (!ok) failures.push(`${check.story}: ${check.name}: ${detail}`);
	}
	for (const message of errors) {
		failures.push(`${check.story}: page error: ${message}`);
	}
	await page.close();
}

await browser.close();
server.close();

if (assertions < CHECKS.length) die("Fewer assertions ran than checks exist.");

if (failures.length > 0) {
	console.error("\n  The built Storybook is not styled:\n");
	for (const failure of failures) console.error(`    ${failure}`);
	console.error();
	process.exit(1);
}

console.log(
	`  Storybook is styled: ${assertions} assertions over ${CHECKS.length} checks.`,
);
