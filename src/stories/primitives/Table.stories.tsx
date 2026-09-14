import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../../components/ui/table";

const meta = {
	title: "Primitives/Table",
	component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Table>
			<TableCaption>Departures this week</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Experience</TableHead>
					<TableHead>Starts</TableHead>
					<TableHead className="text-right">Booked</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>Kayak tour</TableCell>
					<TableCell>Mon 09:00</TableCell>
					<TableCell className="text-right">4</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Wine tasting</TableCell>
					<TableCell>Tue 18:00</TableCell>
					<TableCell className="text-right">12</TableCell>
				</TableRow>
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell className="text-right">16</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	),
};
