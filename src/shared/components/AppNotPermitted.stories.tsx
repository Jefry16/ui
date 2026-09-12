import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "#/components/ui/button";
import { AppNotPermitted } from "./AppNotPermitted";

const meta = {
	title: "Shared/AppNotPermitted",
	component: AppNotPermitted,
	decorators: [
		(Story) => (
			<div className="mx-auto w-full max-w-3xl">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof AppNotPermitted>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithWayOut: Story = {
	args: {
		action: (
			<Button variant="outline" size="sm">
				Back to experiences
			</Button>
		),
	},
};
