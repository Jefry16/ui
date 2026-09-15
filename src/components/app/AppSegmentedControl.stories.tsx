import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppSegmentedControl } from "./AppSegmentedControl";

const OPTIONS = [
	{ value: "recurring", label: "Recurring" },
	{ value: "single", label: "One-time" },
];

const meta = {
	title: "Components/AppSegmentedControl",
	component: AppSegmentedControl,
	args: {
		label: "Kind of availability",
		value: "recurring",
		onChange: () => {},
		options: OPTIONS,
	},
	render: (args) => {
		const [value, setValue] = useState(args.value);
		return <AppSegmentedControl {...args} value={value} onChange={setValue} />;
	},
} satisfies Meta<typeof AppSegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm" } };
