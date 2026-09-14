import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "../../components/ui/alert";
import { Button } from "../../components/ui/button";

const meta = {
	title: "Primitives/Alert",
	component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Heads up</AlertTitle>
			<AlertDescription>The registry ships this alert as is.</AlertDescription>
		</Alert>
	),
};

export const Destructive: Story = {
	render: () => (
		<Alert variant="destructive">
			<AlertTitle>Something failed</AlertTitle>
			<AlertDescription>The request was refused.</AlertDescription>
		</Alert>
	),
};

export const WithAction: Story = {
	render: () => (
		<Alert>
			<AlertTitle>Update available</AlertTitle>
			<AlertDescription>A newer version is ready.</AlertDescription>
			<AlertAction>
				<Button size="sm" variant="outline">
					Update
				</Button>
			</AlertAction>
		</Alert>
	),
};
