import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";

const meta = {
	title: "Primitives/Select",
	component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Select defaultValue="eur">
			<SelectTrigger className="w-64">
				<SelectValue placeholder="Currency" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Currency</SelectLabel>
					<SelectItem value="eur">Euro</SelectItem>
					<SelectItem value="usd">US dollar</SelectItem>
					<SelectItem value="gbp">Pound sterling</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	),
};
