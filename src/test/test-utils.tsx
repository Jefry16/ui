import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { type UiDataClient, UiDataProvider } from "../providers/data";
import { UiLabelsProvider } from "../providers/labels";
import {
	type UiNavigation,
	UiNavigationProvider,
} from "../providers/navigation";
import { errorMessage, neverNotFound } from "./data";
import { testLabels } from "./labels";

const noClient: UiDataClient = {
	get: async () => {
		throw new Error("this test rendered a data component with no client");
	},
	errorMessage,
	isNotFound: neverNotFound,
};

const noNavigation: UiNavigation = { back: () => {} };

export const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0, staleTime: Number.POSITIVE_INFINITY },
			mutations: { retry: false },
		},
	});

interface ProviderOptions {
	client?: UiDataClient;
	queryClient?: QueryClient;
	navigation?: UiNavigation;
}

export const wrapperWithProviders = ({
	client = noClient,
	queryClient = createTestQueryClient(),
	navigation = noNavigation,
}: ProviderOptions = {}) => {
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<UiLabelsProvider labels={testLabels}>
			<QueryClientProvider client={queryClient}>
				<UiDataProvider client={client}>
					<UiNavigationProvider navigation={navigation}>
						<TooltipProvider>{children}</TooltipProvider>
					</UiNavigationProvider>
				</UiDataProvider>
			</QueryClientProvider>
		</UiLabelsProvider>
	);
	return { Wrapper, queryClient };
};

export const renderWithProviders = (
	ui: ReactElement,
	options: ProviderOptions & Omit<RenderOptions, "wrapper"> = {},
) => {
	const { client, queryClient, navigation, ...rtlOptions } = options;
	const { Wrapper } = wrapperWithProviders({ client, queryClient, navigation });
	return render(ui, { ...rtlOptions, wrapper: Wrapper });
};
