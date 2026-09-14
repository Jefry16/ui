import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppNotFound } from "./AppNotFound";

const meta = {
	title: "Components/AppNotFound",
	component: AppNotFound,
	args: { resource: "Experience" },
} satisfies Meta<typeof AppNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
	args: { description: "This experience was deleted last week." },
};
