import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppAudiencePriceTable } from "./AppAudiencePriceTable";
import type { AppStaticTableColumn } from "./AppStaticTable";

interface Tier {
	audienceId: string;
	audienceName: string;
	price: number;
	capacity: number;
	booked: number;
}

const rows: Tier[] = [
	{
		audienceId: "a",
		audienceName: "Adult",
		price: 45,
		capacity: 12,
		booked: 7,
	},
	{
		audienceId: "c",
		audienceName: "Child",
		price: 22.5,
		capacity: 6,
		booked: 0,
	},
	{ audienceId: "i", audienceName: "Infant", price: 0, capacity: 4, booked: 1 },
];

const tierColumns: AppStaticTableColumn<Tier>[] = [
	{
		id: "capacity",
		header: "Capacity",
		cell: (r) => r.capacity,
		numeric: true,
	},
	{ id: "booked", header: "Booked", cell: (r) => r.booked, numeric: true },
];

const meta = {
	title: "Components/AppAudiencePriceTable",
	component: AppAudiencePriceTable,
	args: { rows, currency: "EUR" },
} satisfies Meta<typeof AppAudiencePriceTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Prices: Story = {};

export const WithCapacity: Story = {
	render: () => (
		<AppAudiencePriceTable rows={rows} currency="EUR" columns={tierColumns} />
	),
};
