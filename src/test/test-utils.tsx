import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { type UiDataClient, UiDataProvider } from "../providers/data";
import { UiLabelsProvider } from "../providers/labels";
import { errorMessage } from "./data";
import { testLabels } from "./labels";

const noClient: UiDataClient = {
	get: async () => {
		throw new Error("this test rendered a data component with no client");
	},
	errorMessage,
};

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
}

export const wrapperWithProviders = ({
	client = noClient,
	queryClient = createTestQueryClient(),
}: ProviderOptions = {}) => {
	const Wrapper = ({ children }: { children: ReactNode }) => (
		<UiLabelsProvider labels={testLabels}>
			<QueryClientProvider client={queryClient}>
				<UiDataProvider client={client}>
					<TooltipProvider>{children}</TooltipProvider>
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
	const { client, queryClient, ...rtlOptions } = options;
	const { Wrapper } = wrapperWithProviders({ client, queryClient });
	return render(ui, { ...rtlOptions, wrapper: Wrapper });
};
