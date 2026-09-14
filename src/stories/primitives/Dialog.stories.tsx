import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components/ui/dialog";

const meta = {
	title: "Primitives/Dialog",
	component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
	render: () => (
		<Dialog defaultOpen>
			<DialogTrigger asChild>
				<Button variant="outline">Open</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete this page?</DialogTitle>
					<DialogDescription>
						The page and its translations are removed permanently.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button variant="destructive">Delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
};
