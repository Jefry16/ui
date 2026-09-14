import type { Meta, StoryObj } from "@storybook/react-vite";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Toaster } from "../../components/ui/sonner";

const meta = {
	title: "Primitives/Sonner",
	component: Toaster,
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex gap-2">
			<Toaster position="bottom-right" />
			<Button
				variant="outline"
				onClick={() => toast.success("Experience created")}
			>
				Success
			</Button>
			<Button
				variant="outline"
				onClick={() => toast.error("Couldn't save changes")}
			>
				Error
			</Button>
		</div>
	),
};
