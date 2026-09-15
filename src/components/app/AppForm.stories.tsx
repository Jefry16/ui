import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AppForm } from "./AppForm";
import { AppFormActions } from "./AppFormActions";

const fields = (
	<FieldGroup>
		<Field>
			<FieldLabel htmlFor="story-slogan">Slogan</FieldLabel>
			<Input id="story-slogan" defaultValue="Hike the cascades" />
		</Field>
	</FieldGroup>
);

const meta = {
	title: "Components/AppForm",
	component: AppForm,
	args: {
		onSubmit: () => {},
		children: fields,
		actions: <AppFormActions isPending={false} submitLabel="Save changes" />,
	},
} satisfies Meta<typeof AppForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
	args: { errorMessage: "The slogan is too long." },
};
