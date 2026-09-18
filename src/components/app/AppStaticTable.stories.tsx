import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppStaticTable, type AppStaticTableColumn } from "./AppStaticTable";

interface Change {
	field: string;
	from: string;
	to: string;
}

const changeColumns: AppStaticTableColumn<Change>[] = [
	{ id: "field", header: "Field", cell: (c) => c.field, emphasis: "strong" },
	{ id: "from", header: "From", cell: (c) => c.from, emphasis: "muted" },
	{ id: "to", header: "To", cell: (c) => c.to },
];

const changes: Change[] = [
	{ field: "Name", from: "Sunset kayak", to: "Sunset kayak tour" },
	{ field: "Duration", from: "90 min", to: "2 h" },
];

interface Tier {
	audience: string;
	price: string;
	capacity: number;
	booked: number;
}

const tierColumns: AppStaticTableColumn<Tier>[] = [
	{ id: "audience", header: "Audience", cell: (t) => t.audience },
	{ id: "price", header: "Price", cell: (t) => t.price, numeric: true },
	{
		id: "capacity",
		header: "Capacity",
		cell: (t) => t.capacity,
		numeric: true,
	},
	{ id: "booked", header: "Booked", cell: (t) => t.booked, numeric: true },
];

const tiers: Tier[] = [
	{ audience: "Adults", price: "€45.00", capacity: 12, booked: 7 },
	{ audience: "Children", price: "€22.50", capacity: 6, booked: 0 },
];

const meta = {
	title: "Components/AppStaticTable",
	component: AppStaticTable<Change>,
	args: {
		columns: changeColumns,
		rows: changes,
		rowKey: (_, index) => String(index),
	},
	decorators: [
		(Story) => (
			<div className="w-full max-w-2xl">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof AppStaticTable<Change>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Changes: Story = {};

export const Numeric: StoryObj<Meta<typeof AppStaticTable<Tier>>> = {
	render: () => (
		<AppStaticTable
			columns={tierColumns}
			rows={tiers}
			rowKey={(tier) => tier.audience}
		/>
	),
};
