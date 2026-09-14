import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
} from "../../components/ui/avatar";

const meta = {
	title: "Primitives/Avatar",
	component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {
	render: () => (
		<Avatar>
			<AvatarFallback>JC</AvatarFallback>
		</Avatar>
	),
};

export const Group: Story = {
	render: () => (
		<AvatarGroup>
			<Avatar>
				<AvatarFallback>JC</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>AL</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>MR</AvatarFallback>
			</Avatar>
			<AvatarGroupCount>+3</AvatarGroupCount>
		</AvatarGroup>
	),
};
