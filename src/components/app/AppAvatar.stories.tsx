import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppAvatar } from "./AppAvatar";

const meta = {
	title: "Components/AppAvatar",
	component: AppAvatar,
	args: { name: "Acme Tours" },
} satisfies Meta<typeof AppAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const Large: Story = { args: { size: "lg" } };
