import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const UI = "src/components/ui";

const relativeImports = (path, source) => {
	const dir = join(root, path, "..");
	return source.replace(/(from |import )"#\/([^"]+)"/g, (_, lead, target) => {
		const rel = relative(dir, join(root, "src", target)).replaceAll("\\", "/");
		return `${lead}"${rel.startsWith(".") ? rel : `./${rel}`}"`;
	});
};

const pinned = {};
for (const path of [
	"components.json",
	...readdirSync(join(root, UI))
		.sort()
		.map((name) => `${UI}/${name}`),
]) {
	const raw = readFileSync(join(root, path), "utf8");
	const normalized = path.endsWith(".tsx") ? relativeImports(path, raw) : raw;
	if (normalized !== raw) writeFileSync(join(root, path), normalized);
	pinned[path] = createHash("sha256").update(normalized).digest("hex");
}

writeFileSync(
	join(root, "src/shared/ui-vendor.json"),
	`${JSON.stringify(pinned, null, "\t")}\n`,
);
console.log(`pinned ${Object.keys(pinned).length} vendored files`);
