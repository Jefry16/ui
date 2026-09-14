import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColumnDef } from "@tanstack/react-table";
import { UiDataProvider } from "../../providers/data";
import { errorMessage } from "../../test/data";
import { AppDataTable } from "./AppDataTable";
import { AppDataTableHeader } from "./AppDataTableHeader";
import { timestampColumn } from "./table-columns";

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
				label="Name"
				headerContext={ctx}
				allowFiltering="text"
			/>
		),
	},
	timestampColumn<Row>("createdAt", "Created", (iso) =>
		new Date(iso).toLocaleDateString("en-GB"),
	),
];

const meta = {
	title: "Components/AppDataTable",
	component: AppDataTable,
} satisfies Meta<typeof AppDataTable>;

export default meta;
type Story = StoryObj<Record<string, never>>;

export const Rows: Story = {
	render: () => (
		<AppDataTable<Row>
			columns={columns}
			endpoint="/members"
			queryKey={["members"]}
			emptyState={{ title: "No members yet" }}
		/>
	),
};

export const Empty: Story = {
	render: () => (
		<UiDataProvider
			client={{
				get: async <R,>() => ({ data: [], nextCursor: null }) as R,
				errorMessage,
			}}
		>
			<AppDataTable<Row>
				columns={columns}
				endpoint="/members-empty"
				queryKey={["members-empty"]}
				emptyState={{
					title: "No members yet",
					description: "Invite teammates to help run the operator.",
				}}
			/>
		</UiDataProvider>
	),
};

export const Refused: Story = {
	render: () => (
		<UiDataProvider
			client={{
				get: async () => {
					throw new Error("The list could not be loaded.");
				},
				errorMessage,
			}}
		>
			<AppDataTable<Row>
				columns={columns}
				endpoint="/members-refused"
				queryKey={["members-refused"]}
			/>
		</UiDataProvider>
	),
};
