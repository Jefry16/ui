import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold } from "lucide-react";
import { Toggle } from "../../components/ui/toggle";

const meta = {
	title: "Primitives/Toggle",
	component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Variants: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-2">
			<Toggle aria-label="Bold">
				<Bold />
			</Toggle>
			<Toggle variant="outline" aria-label="Bold, outlined">
				<Bold />
			</Toggle>
			<Toggle variant="outline" defaultPressed>
				Pressed
			</Toggle>
			<Toggle variant="outline" size="sm">
				Small
			</Toggle>
			<Toggle variant="outline" disabled>
				Disabled
			</Toggle>
		</div>
	),
};
