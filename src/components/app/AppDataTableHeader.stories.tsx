import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { AppDataTable } from "./AppDataTable";
import { AppDataTableHeader } from "./AppDataTableHeader";

interface Row {
	id: string;
	name: string;
	createdAt: string;
}

const columns: ColumnDef<Row, unknown>[] = [
	{
		id: "name",
		accessorKey: "name",
		enableSorting: true,
		header: (ctx) => (
			<AppDataTableHeader
				label="Sortable, text filter"
				headerContext={ctx}
				allowFiltering="text"
			/>
		),
	},
	{
		id: "role",
		accessorFn: () => "Owner",
		header: (ctx) => (
			<AppDataTableHeader
				label="Set filter"
				headerContext={ctx}
				allowFiltering="set"
				items={[
					{ value: "owner", label: "Owner" },
					{ value: "admin", label: "Admin" },
					{ value: "staff", label: "Staff" },
				]}
			/>
		),
	},
	{
		id: "invitedBy",
		accessorFn: () => "Ada",
		header: (ctx) => (
			<AppDataTableHeader
				label="Async set filter"
				headerContext={ctx}
				allowFiltering="setAsync"
				endpoint="/members"
				queryKey={["members"]}
			/>
		),
	},
	{
		id: "plain",
		accessorFn: () => "—",
		header: (ctx) => <AppDataTableHeader label="Plain" headerContext={ctx} />,
	},
];

const meta = {
	title: "Components/AppDataTableHeader",
	component: AppDataTableHeader,
} satisfies Meta<typeof AppDataTableHeader>;

export default meta;
type Story = StoryObj<Record<string, never>>;

export const EveryKind: Story = {
	render: () => (
		<AppDataTable<Row>
			columns={columns}
			endpoint="/members"
			queryKey={["members"]}
		/>
	),
};
