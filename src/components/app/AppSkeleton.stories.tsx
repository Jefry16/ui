import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppSkeleton } from "./AppSkeleton";

const meta = {
	title: "Components/AppSkeleton",
	component: AppSkeleton,
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof AppSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Control: Story = { args: { variant: "control" } };

export const Image: Story = {
	args: { variant: "image" },
	decorators: [
		(Story) => (
			<div className="size-32 overflow-hidden rounded-md border">
				<Story />
			</div>
		),
	],
};

export const List: Story = { args: { variant: "list", rows: 3 } };
