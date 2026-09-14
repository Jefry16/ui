import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../ui/button";
import { AppFormActions } from "./AppFormActions";

const meta = {
	title: "Components/AppFormActions",
	component: AppFormActions,
	args: { isPending: false, submitLabel: "Save changes" },
} satisfies Meta<typeof AppFormActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pending: Story = { args: { isPending: true } };

export const WithSecondary: Story = {
	args: {
		secondary: (
			<Button type="button" variant="outline">
				Cancel
			</Button>
		),
	},
};
