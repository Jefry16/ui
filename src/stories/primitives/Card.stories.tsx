import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";

const meta = {
	title: "Primitives/Card",
	component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Shop details</CardTitle>
				<CardDescription>Name, address and contact details.</CardDescription>
				<CardAction>
					<Button size="sm" variant="outline">
						Edit
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<p className="text-sm">Fresh Tours, Calle Mayor 1, Madrid.</p>
			</CardContent>
			<CardFooter>
				<Button size="sm">Save changes</Button>
			</CardFooter>
		</Card>
	),
};
