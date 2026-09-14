import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from "../../components/ui/popover";

const meta = {
	title: "Primitives/Popover",
	component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	render: () => (
		<Popover defaultOpen>
			<PopoverTrigger asChild>
				<Button variant="outline">Details</Button>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>Booking cutoff</PopoverTitle>
					<PopoverDescription>
						Bookings close this many hours before departure.
					</PopoverDescription>
				</PopoverHeader>
			</PopoverContent>
		</Popover>
	),
};
