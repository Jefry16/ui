import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const meta = {
	title: "Primitives/Label",
	component: Label,
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-2">
			<Label htmlFor="name">Name</Label>
			<Input id="name" />
		</div>
	),
};
