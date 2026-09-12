import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		tsconfigPaths({ projects: ["./tsconfig.json"] }),
		tailwindcss(),
		viteReact(),
	],
	test: {
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		globals: false,
		css: false,
	},
});
