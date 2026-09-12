import type { Decorator, Preview } from "@storybook/react-vite";
import { TooltipProvider } from "#/components/ui/tooltip";
import { UiLabelsProvider } from "#/shared/labels";
import { ThemeProvider } from "#/shared/theme";
import { testLabels } from "#/test/labels";
import "../src/styles.css";

const withProviders: Decorator = (Story) => (
	<ThemeProvider>
		<UiLabelsProvider labels={testLabels}>
			<TooltipProvider>
				<Story />
			</TooltipProvider>
		</UiLabelsProvider>
	</ThemeProvider>
);

const preview: Preview = {
	decorators: [withProviders],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: "todo",
		},
	},
};

export default preview;
