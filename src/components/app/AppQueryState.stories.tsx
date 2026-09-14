import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import type { QueryState } from "../../data/query-state";
import { AppLoadingBlock } from "./AppLoadingBlock";
import { AppQueryState } from "./AppQueryState";

const meta = {
	title: "Components/AppQueryState",
	component: AppQueryState,
} satisfies Meta<typeof AppQueryState>;

export default meta;
type Story = StoryObj<Record<string, never>>;

const state = (over: Partial<QueryState<string>>): QueryState<string> => ({
	data: undefined,
	isPending: false,
	error: null,
	refetch: () => {},
	...over,
});

const chrome = (body: ReactNode) => (
	<section className="w-96 rounded-md border bg-card p-4">
		<h2 className="mb-2 font-semibold">Custom fields</h2>
		{body}
	</section>
);

const render = (query: QueryState<string>) => () => (
	<AppQueryState query={query} chrome={chrome} loading={<AppLoadingBlock />}>
		{(value) => <p className="text-sm">{value}</p>}
	</AppQueryState>
);

export const Pending: Story = { render: render(state({ isPending: true })) };
export const Failed: Story = {
	render: render(state({ error: new Error("The list could not be loaded.") })),
};
export const Loaded: Story = {
	render: render(state({ data: "Three fields defined." })),
};
