import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppBadge } from "./AppBadge";

const meta = {
	title: "Components/AppBadge",
	component: AppBadge,
	args: { children: "Badge" },
} satisfies Meta<typeof AppBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Success: Story = { args: { variant: "success" } };
export const Warning: Story = { args: { variant: "warning" } };
export const Info: Story = { args: { variant: "info" } };
export const Destructive: Story = { args: { variant: "destructive" } };

export const Statuses: Story = {
	render: () => (
		<div className="flex gap-2">
			<AppBadge variant="success">Published</AppBadge>
			<AppBadge variant="secondary">Draft</AppBadge>
			<AppBadge variant="info">Featured</AppBadge>
			<AppBadge variant="warning">Sold out</AppBadge>
			<AppBadge variant="destructive">Cancelled</AppBadge>
			<AppBadge variant="outline">Expired</AppBadge>
		</div>
	),
};
