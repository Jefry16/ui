import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { AppPageHeader } from "./AppPageHeader";

const meta = {
	title: "Components/AppPageHeader",
	component: AppPageHeader,
	args: { title: "Experiences" },
} satisfies Meta<typeof AppPageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {};

export const WithDescription: Story = {
	args: { description: "The tours and activities you sell." },
};

export const WithActions: Story = {
	args: {
		description: "The tours and activities you sell.",
		actions: (
			<Button>
				<PlusIcon className="size-4" />
				New experience
			</Button>
		),
	},
};
