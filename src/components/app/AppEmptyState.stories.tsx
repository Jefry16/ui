import type { Meta, StoryObj } from "@storybook/react-vite";
import { UsersRound } from "lucide-react";
import { Button } from "../ui/button";
import { AppEmptyState } from "./AppEmptyState";

const meta = {
	title: "Components/AppEmptyState",
	component: AppEmptyState,
	args: {
		icon: UsersRound,
		title: "No team members yet",
		description: "Invite people to help run this tour operator.",
	},
} satisfies Meta<typeof AppEmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
	args: {
		action: <Button>Invite a member</Button>,
	},
};

export const TitleOnly: Story = {
	args: { icon: undefined, description: undefined },
};

export const Inline: Story = {
	args: {
		variant: "inline",
		icon: undefined,
		title: "No social links yet",
		description: undefined,
	},
};
