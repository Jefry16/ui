import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "../../components/ui/calendar";

const meta = {
	title: "Primitives/Calendar",
	component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const selected = new Date(2026, 8, 14);

export const Single: Story = {
	render: () => (
		<Calendar mode="single" selected={selected} defaultMonth={selected} />
	),
};
