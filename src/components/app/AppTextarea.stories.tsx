import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppTextarea } from "./AppTextarea";

function Demo({ json }: { json?: boolean }) {
	const [value, setValue] = useState(json ? '{ "featured": true }' : "");
	return (
		<div className="w-96">
			<AppTextarea
				aria-label="Alt text"
				value={value}
				onValueChange={setValue}
				rows={json ? 4 : 3}
				maxLength={json ? undefined : 125}
				placeholder={json ? undefined : "What the image shows"}
				className={json ? "font-mono text-xs" : undefined}
			/>
		</div>
	);
}

const meta = {
	title: "Components/AppTextarea",
	component: Demo,
} satisfies Meta<typeof Demo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Json: Story = { args: { json: true } };
