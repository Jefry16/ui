import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppTextInput } from "./AppTextInput";

function Demo({ mono }: { mono?: boolean }) {
	const [value, setValue] = useState(mono ? "about-us" : "");
	return (
		<div className="w-72">
			<AppTextInput
				aria-label="Title"
				value={value}
				onValueChange={setValue}
				placeholder={mono ? undefined : "Search"}
				className={mono ? "font-mono" : undefined}
			/>
		</div>
	);
}

const meta = {
	title: "Components/AppTextInput",
	component: Demo,
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Mono: Story = { args: { mono: true } };
