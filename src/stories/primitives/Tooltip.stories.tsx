import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../components/ui/tooltip";

const meta = {
	title: "Primitives/Tooltip",
	component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	render: () => (
		<Tooltip defaultOpen>
			<TooltipTrigger asChild>
				<Button variant="outline">Hover me</Button>
			</TooltipTrigger>
			<TooltipContent>More actions</TooltipContent>
		</Tooltip>
	),
};
