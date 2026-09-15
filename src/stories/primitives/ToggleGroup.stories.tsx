import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";

const meta = {
	title: "Primitives/ToggleGroup",
	component: ToggleGroup,
	args: { type: "single" },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Multiple: Story = {
	render: () => (
		<ToggleGroup type="multiple" variant="outline" aria-label="Text style">
			<ToggleGroupItem value="bold" aria-label="Bold">
				<Bold />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" aria-label="Italic">
				<Italic />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline" aria-label="Underline">
				<Underline />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const SingleJoined: Story = {
	render: () => (
		<ToggleGroup
			type="single"
			variant="outline"
			spacing={0}
			defaultValue="week"
			aria-label="Range"
		>
			<ToggleGroupItem value="day">Day</ToggleGroupItem>
			<ToggleGroupItem value="week">Week</ToggleGroupItem>
			<ToggleGroupItem value="month">Month</ToggleGroupItem>
		</ToggleGroup>
	),
};
