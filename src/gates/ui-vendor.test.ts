import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { basename, join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import pinned from "./ui-vendor.json";

const ROOT = process.cwd();
const UI = "src/components/ui";
const PINNED: Record<string, string> = pinned;

const sourceFiles: string[] = [];
const walk = (dir: string) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walk(full);
		else if (/\.(ts|tsx)$/.test(entry.name)) sourceFiles.push(full);
	}
};
walk(join(ROOT, "src"));

const isTestOrStory = (path: string) => /\.(test|stories)\.tsx?$/.test(path);
const subjectOf = (path: string) =>
	basename(path).replace(/\.(test|stories)\.tsx?$/, "");
const normalised = (name: string) => name.toLowerCase().replace(/[^a-z]/g, "");
const PRIMITIVES = new Set(
	readdirSync(join(ROOT, UI)).map((name) =>
		normalised(name.replace(/\.tsx$/, "")),
	),
);
const SHOWCASE_DIR = "src/stories/primitives";
const SHOWCASE = /\/src\/stories\/primitives\/[A-Za-z]+\.stories\.tsx$/;
const IMPORTS_PRIMITIVE = /from\s*["'][^"']*\/ui\/[a-z-]+["']/;
const IMPORTS_OURS_BY_PATH =
	/from\s*["'][^"']*\/(?:components\/app|providers)\/[A-Za-z]+["']/;
const IMPORTS_SIBLING = /from\s*["']\.\/[A-Za-z-]+["']/;
const LIVES_WITH_OURS = /\/src\/(?:components\/app|providers)\//;
const importsOurs = (path: string, source: string) =>
	IMPORTS_OURS_BY_PATH.test(source) ||
	(LIVES_WITH_OURS.test(path) && IMPORTS_SIBLING.test(source));

const NOT_TESTED =
	"Vendored primitives are not tested here: their tests are upstream's, and " +
	"one written here pins a file this repo does not own. A test may import a " +
	"primitive only as scaffolding for a subject in src/components/app or " +
	"src/providers.";

const sha256 = (path: string) =>
	createHash("sha256")
		.update(readFileSync(join(ROOT, path)))
		.digest("hex");

const onDisk: Record<string, string> = Object.fromEntries(
	[
		"components.json",
		...readdirSync(join(ROOT, UI))
			.sort()
			.map((name) => `${UI}/${name}`),
	].map((path) => [path, sha256(path)]),
);

const VENDORED =
	`${UI} is vendored from shadcn and is never edited by hand. To change how a ` +
	"component looks, change a token in src/styles.css or wrap it in src/components/app. " +
	"To add one: pnpm dlx shadcn@latest add <name>, then pnpm pin-ui. To upgrade " +
	"one: the same command, then pnpm pin-ui, in a PR that says so.";

describe("ui vendor pin", () => {
	it("the directory walk is wired (a broken walk must not pass vacuously)", () => {
		expect(Object.keys(onDisk).length).toBeGreaterThan(1);
	});

	it("no vendored file differs from its pin", () => {
		const edited = Object.keys(onDisk).filter(
			(path) => path in PINNED && PINNED[path] !== onDisk[path],
		);
		expect(edited, VENDORED).toEqual([]);
	});

	it("every vendored file is pinned and every pin still has a file", () => {
		const unpinned = Object.keys(onDisk).filter((path) => !(path in PINNED));
		const gone = Object.keys(PINNED).filter((path) => !(path in onDisk));
		expect(
			{ unpinned, gone },
			`${VENDORED} A file was added or removed without pnpm pin-ui.`,
		).toEqual({ unpinned: [], gone: [] });
	});
});

describe("vendored primitives are not tested here", () => {
	it("the source walk is wired (a broken walk must not pass vacuously)", () => {
		expect(sourceFiles.length).toBeGreaterThan(50);
		expect(PRIMITIVES.size).toBeGreaterThan(10);
	});

	it("the vendored folder holds components only", () => {
		const others = readdirSync(join(ROOT, UI)).filter(
			(name) => !/^[a-z-]+\.tsx$/.test(name),
		);
		expect(others, NOT_TESTED).toEqual([]);
	});

	it("no test, and no story outside the showcase, is named for a primitive", () => {
		const named = sourceFiles
			.filter(isTestOrStory)
			.filter((path) => !SHOWCASE.test(path) || /\.test\.tsx?$/.test(path))
			.filter((path) => PRIMITIVES.has(normalised(subjectOf(path))))
			.map((path) => relative(ROOT, path));
		expect(
			named,
			`${NOT_TESTED} A primitive is shown in Storybook from ${SHOWCASE_DIR} ` +
				"only, where story-render never mounts it.",
		).toEqual([]);
	});

	it("a test imports a primitive only as scaffolding for a subject of ours", () => {
		const bare = sourceFiles
			.filter((path) => /\.test\.tsx?$/.test(path))
			.filter((path) => {
				const source = readFileSync(path, "utf8");
				return IMPORTS_PRIMITIVE.test(source) && !importsOurs(path, source);
			})
			.map((path) => relative(ROOT, path));
		expect(bare, NOT_TESTED).toEqual([]);
	});
});
