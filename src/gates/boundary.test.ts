import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

const files: string[] = [];
const walk = (dir: string) => {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) walk(full);
		else if (/\.(ts|tsx)$/.test(entry.name)) files.push(full);
	}
};
walk(join(ROOT, "src"));

const ALIAS_IMPORT = /(?:from\s*|import\s*\(?\s*)["']#\//;

const DEPENDENCIES = [
	"@fontsource-variable/geist",
	"class-variance-authority",
	"clsx",
	"cmdk",
	"lucide-react",
	"next-themes",
	"radix-ui",
	"react-day-picker",
	"shadcn",
	"sonner",
	"tailwind-merge",
	"tw-animate-css",
];

const PEER_DEPENDENCIES = [
	"@tanstack/react-form",
	"@tanstack/react-query",
	"@tanstack/react-table",
	"react",
	"react-dom",
	"tailwindcss",
];

const DEV_DEPENDENCIES = [
	"@biomejs/biome",
	"@storybook/addon-a11y",
	"@storybook/addon-docs",
	"@storybook/react-vite",
	"@tailwindcss/vite",
	"@tanstack/react-form",
	"@tanstack/react-query",
	"@tanstack/react-table",
	"@testing-library/dom",
	"@testing-library/jest-dom",
	"@testing-library/react",
	"@testing-library/user-event",
	"@types/node",
	"@types/react",
	"@types/react-dom",
	"@vitejs/plugin-react",
	"axe-core",
	"jsdom",
	"knip",
	"playwright",
	"react",
	"react-dom",
	"storybook",
	"tailwindcss",
	"typescript",
	"vite",
	"vite-tsconfig-paths",
	"vitest",
];

const manifest = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const declared = (section: string): string[] =>
	Object.keys(manifest[section] ?? {}).sort();

describe("package boundary", () => {
	it("the walk is wired (a broken walk must not pass vacuously)", () => {
		expect(files.length).toBeGreaterThan(50);
	});

	it("no file imports through the #/ alias", () => {
		const offenders = files
			.filter((file) => ALIAS_IMPORT.test(readFileSync(file, "utf8")))
			.map((file) => relative(ROOT, file));
		expect(
			offenders,
			"Imports inside this package are relative. The #/ alias resolves here " +
				"through tsconfig and resolves to the consumer's own src there, so a " +
				"file that uses it typechecks in this repo and breaks every app that " +
				"installs it. The shadcn CLI writes the alias; pnpm pin-ui rewrites it.",
		).toEqual([]);
	});

	it("the dependency set is exactly the one listed here", () => {
		expect(
			{
				dependencies: declared("dependencies"),
				peerDependencies: declared("peerDependencies"),
				devDependencies: declared("devDependencies"),
			},
			"This package renders; it knows no route and no endpoint. Its " +
				"dependency set is closed: a new one is a deliberate line in this " +
				"test, in the same PR, with the reason in the PR body. A router, a " +
				"query client or an HTTP client does not belong here at all.",
		).toEqual({
			dependencies: [...DEPENDENCIES].sort(),
			peerDependencies: [...PEER_DEPENDENCIES].sort(),
			devDependencies: [...DEV_DEPENDENCIES].sort(),
		});
	});
});
