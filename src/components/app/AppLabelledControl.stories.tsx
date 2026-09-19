import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AppLabelledControl } from "./AppLabelledControl";
import { AppNumericInput } from "./AppNumericInput";
import { AppTextInput } from "./AppTextInput";

function Stack() {
	const [value, setValue] = useState("");
	return (
		<AppLabelledControl
			label="Colour"
			code="custom.colour"
			htmlFor="stack"
			description="Shown on the product page"
		>
			<AppTextInput id="stack" value={value} onValueChange={setValue} />
		</AppLabelledControl>
	);
}

function Row() {
	const [value, setValue] = useState("12");
	return (
		<AppLabelledControl
			label="Adults"
			hint="3 booked"
			htmlFor="row"
			layout="row"
			invalid={Number(value) < 3}
		>
			<AppNumericInput
				id="row"
				className="w-24 text-right"
				value={value}
				onValueChange={setValue}
				aria-invalid={Number(value) < 3 || undefined}
			/>
		</AppLabelledControl>
	);
}

function HiddenLabel() {
	const [value, setValue] = useState("");
	return (
		<AppLabelledControl label="Search" htmlFor="hidden" hideLabel>
			<AppTextInput
				id="hidden"
				placeholder="Search"
				value={value}
				onValueChange={setValue}
			/>
		</AppLabelledControl>
	);
}

function Group() {
	const [first, setFirst] = useState("");
	const [second, setSecond] = useState("");
	return (
		<AppLabelledControl
			label="Fields"
			required
			invalid={!first}
			errors={[{ message: "Add at least one field" }]}
		>
			<AppTextInput aria-label="First" value={first} onValueChange={setFirst} />
			<AppTextInput
				aria-label="Second"
				value={second}
				onValueChange={setSecond}
			/>
		</AppLabelledControl>
	);
}

const meta = {
	title: "Components/AppLabelledControl",
	component: Stack,
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};

export const InARow: Story = { render: () => <Row /> };

export const AroundAGroup: Story = { render: () => <Group /> };

export const HiddenLabelStory: Story = {
	name: "With a hidden label",
	render: () => <HiddenLabel />,
};
