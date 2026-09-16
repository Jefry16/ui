import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppDatePicker } from "./AppDatePicker";

function PickerDemo(props: { initial?: string; blockPast?: boolean }) {
	const [value, setValue] = useState(props.initial ?? "");
	return (
		<div className="w-96">
			<AppDatePicker
				value={value}
				onValueChange={setValue}
				disabledDates={props.blockPast ? { before: new Date() } : undefined}
			/>
		</div>
	);
}

const meta = {
	title: "Components/AppDatePicker",
	component: PickerDemo,
} satisfies Meta<typeof PickerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: {} };
export const WithValue: Story = { args: { initial: "2026-08-01" } };
export const PastBlocked: Story = { args: { blockPast: true } };
