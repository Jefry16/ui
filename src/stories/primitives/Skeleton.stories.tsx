import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../components/ui/skeleton";

const meta = {
	title: "Primitives/Skeleton",
	component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-2">
			<Skeleton className="h-4 w-3/4" />
			<Skeleton className="h-4 w-1/2" />
			<Skeleton className="h-24 w-full" />
		</div>
	),
};
