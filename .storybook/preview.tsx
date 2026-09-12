import type { Decorator, Preview } from "@storybook/react-vite";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { UiLabelsProvider } from "../src/shared/labels";
import { ThemeProvider } from "../src/shared/theme";
import { testLabels } from "../src/test/labels";
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
