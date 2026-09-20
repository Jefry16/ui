import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src", "styles.css"), "utf8");

const block = (selector: string): Map<string, string> => {
	const start = css.indexOf(`${selector} {`);
	const body = css.slice(start, css.indexOf("\n}", start));
	return new Map(
		[...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [
			name,
			value.trim(),
		]),
	);
};

type Rgba = [number, number, number, number];

const oklch = (value: string): Rgba => {
	const match = value.match(
		/^oklch\(([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+)%)?\)$/,
	);
	if (!match) throw new Error(`not an oklch colour: ${value}`);
	const [l, c, h, alpha] = match.slice(1).map(Number);
	const a = c * Math.cos((h * Math.PI) / 180);
	const b = c * Math.sin((h * Math.PI) / 180);
	const lc = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const mc = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const sc = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
	const encode = (x: number) =>
		x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
	return [
		encode(4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc),
		encode(-1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc),
		encode(-0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc),
		Number.isNaN(alpha) ? 1 : alpha / 100,
	];
};

const luminance = ([r, g, b]: Rgba | number[]) => {
	const decode = (x: number) =>
		x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
	return 0.2126 * decode(r) + 0.7152 * decode(g) + 0.0722 * decode(b);
};

const contrast = (over: Rgba, surface: Rgba) => {
	const painted = [0, 1, 2].map(
		(i) => over[3] * over[i] + (1 - over[3]) * surface[i],
	);
	const [light, dark] = [luminance(painted), luminance(surface)].sort(
		(x, y) => y - x,
	);
	return (light + 0.05) / (dark + 0.05);
};

describe("the token sheet keeps the shape and the control edge DESIGN.md states", () => {
	it("no radius step is larger than the one radius", () => {
		const theme = block("@theme inline");
		const larger = ["lg", "xl", "2xl", "3xl", "4xl"].filter(
			(step) => theme.get(`--radius-${step}`) !== "var(--radius)",
		);
		expect(
			larger,
			"A vendored card, dialog or badge asks for rounded-xl and up. Those " +
				"steps resolve to --radius itself, so a surface is never rounder " +
				"than the control inside it.",
		).toEqual([]);
	});

	it("a resting surface casts no shadow", () => {
		const theme = block("@theme inline");
		const cast = ["2xs", "xs", "sm"].filter(
			(step) => theme.get(`--shadow-${step}`) !== "0 0 #0000",
		);
		expect(
			cast,
			"Depth is lightness: sidebar, ground, card. The small shadow steps " +
				"are what a vendored resting surface asks for, and they resolve to " +
				"nothing. `shadow-md` and up stay, for what floats over the page.",
		).toEqual([]);
	});

	it("a control's edge reads at 3:1 on every surface it sits on", () => {
		const faint = ["", ".dark"].flatMap((selector) => {
			const tokens = block(selector === "" ? ":root" : selector);
			const edge = oklch(tokens.get("--input") as string);
			return ["--card", "--background"]
				.map((surface) => ({
					theme: selector || "light",
					surface,
					ratio: contrast(edge, oklch(tokens.get(surface) as string)),
				}))
				.filter(({ ratio }) => ratio < 3);
		});
		expect(
			faint,
			"--input is the border of every input, textarea, select and checkbox. " +
				"WCAG 1.4.11 asks 3:1 of the edge that identifies a control, " +
				"against the card and against the page ground, in both themes.",
		).toEqual([]);
	});
});
