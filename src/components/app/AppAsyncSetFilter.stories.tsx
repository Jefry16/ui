import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HeaderContext } from "@tanstack/react-table";
import { useState } from "react";
import { AppAsyncSetFilter } from "./AppAsyncSetFilter";

interface Row {
	name: string;
}

const Harness = () => {
	const [value, setValue] = useState<unknown>(undefined);
	const context = {
		column: { getFilterValue: () => value, setFilterValue: setValue },
	} as unknown as HeaderContext<Row, unknown>;
	return (
		<div className="w-52 rounded-md border bg-popover p-3">
			<AppAsyncSetFilter
				headerContext={context}
				endpoint="/members"
				queryKey={["members"]}
			/>
		</div>
	);
};

const meta = {
	title: "Components/AppAsyncSetFilter",
	component: AppAsyncSetFilter,
} satisfies Meta<typeof AppAsyncSetFilter>;

export default meta;
type Story = StoryObj<Record<string, never>>;

export const Drained: Story = { render: () => <Harness /> };
