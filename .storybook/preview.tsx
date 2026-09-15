import type { Decorator, Preview } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { UiDataProvider } from "../src/providers/data";
import { UiLabelsProvider } from "../src/providers/labels";
import { UiNavigationProvider } from "../src/providers/navigation";
import { ThemeProvider } from "../src/providers/theme";
import { storyClient } from "../src/test/data";
import { testLabels } from "../src/test/labels";
import "../src/styles.css";

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false } },
});

const withProviders: Decorator = (Story) => (
	<ThemeProvider>
		<UiLabelsProvider labels={testLabels}>
			<QueryClientProvider client={queryClient}>
				<UiDataProvider client={storyClient}>
					<UiNavigationProvider navigation={{ back: () => {} }}>
						<TooltipProvider>
							<Story />
						</TooltipProvider>
					</UiNavigationProvider>
				</UiDataProvider>
			</QueryClientProvider>
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
