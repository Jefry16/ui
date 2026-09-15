import type { Meta, StoryObj } from "@storybook/react-vite";
import type { QueryState } from "../../data/query-state";
import { UiDataProvider } from "../../providers/data";
import { errorMessage } from "../../test/data";
import { AppDetailSkeleton } from "./AppDetailSkeleton";
import { AppResourceView } from "./AppResourceView";

interface Experience {
	name: string;
}

const meta = {
	title: "Components/AppResourceView",
	component: AppResourceView,
} satisfies Meta<typeof AppResourceView>;

export default meta;
type Story = StoryObj<Record<string, never>>;

const state = (
	over: Partial<QueryState<Experience>>,
): QueryState<Experience> => ({
	data: undefined,
	isPending: false,
	error: null,
	refetch: () => {},
	...over,
});

const view = (query: QueryState<Experience>) => (
	<AppResourceView
		query={query}
		resource="Experience"
		loading={<AppDetailSkeleton fields={4} />}
	>
		{(experience) => <p className="text-sm">{experience.name}</p>}
	</AppResourceView>
);

export const Pending: Story = {
	render: () => view(state({ isPending: true })),
};

export const Loaded: Story = {
	render: () => view(state({ data: { name: "Kayak tour" } })),
};

export const Failed: Story = {
	render: () =>
		view(state({ error: new Error("The server refused the request.") })),
};

export const NotFound: Story = {
	render: () => (
		<UiDataProvider
			client={{
				get: async () => {
					throw new Error("unused");
				},
				errorMessage,
				isNotFound: () => true,
			}}
		>
			{view(state({ error: new Error("gone") }))}
		</UiDataProvider>
	),
};
