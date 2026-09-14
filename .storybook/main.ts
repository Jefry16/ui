import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx)"],
	addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
	framework: "@storybook/react-vite",
	// The framework's own Vite config knows nothing about Tailwind: without
	// this, `styles.css`'s `@import "tailwindcss"` never generates a single
	// utility rule, and every component renders in the browser's default
	// styling. `vitest.config.ts` carries the same plugin for the same reason.
	async viteFinal(baseConfig) {
		baseConfig.plugins ??= [];
		baseConfig.plugins.push(tailwindcss());
		return baseConfig;
	},
};

export default config;
