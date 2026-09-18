import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { SelectItem } from "../ui/select";
import { AppSelect } from "./AppSelect";

function SelectDemo(props: { initial?: string; disabled?: boolean }) {
	const [value, setValue] = useState(props.initial ?? "");
	return (
		<div className="w-80">
			<AppSelect
				aria-label="Currency"
				value={value}
				onValueChange={setValue}
				disabled={props.disabled}
				placeholder="Select a currency"
			>
				<SelectItem value="eur">EUR — Euro</SelectItem>
				<SelectItem value="usd">USD — US Dollar</SelectItem>
				<SelectItem value="dop">DOP — Dominican Peso</SelectItem>
			</AppSelect>
		</div>
	);
}

const meta = {
	title: "Components/AppSelect",
	component: SelectDemo,
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: {} };
export const WithValue: Story = { args: { initial: "usd" } };
export const Disabled: Story = { args: { initial: "usd", disabled: true } };
