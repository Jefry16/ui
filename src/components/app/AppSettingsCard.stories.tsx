import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { AppDetailField } from "./AppDetailField";
import { AppForm } from "./AppForm";
import { AppFormActions } from "./AppFormActions";
import { AppFormSkeleton } from "./AppFormSkeleton";
import { AppSettingsCard } from "./AppSettingsCard";

const meta = {
	title: "Components/AppSettingsCard",
	component: AppSettingsCard,
	args: {
		title: "Brand",
		description: "The slogan and short description shown on the storefront.",
		children: (
			<AppForm
				onSubmit={() => {}}
				actions={
					<AppFormActions isPending={false} submitLabel="Save changes" />
				}
			>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="story-slogan">Slogan</FieldLabel>
						<Input id="story-slogan" defaultValue="Hike the cascades" />
					</Field>
				</FieldGroup>
			</AppForm>
		),
	},
} satisfies Meta<typeof AppSettingsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Editing: Story = {};

export const ReadOnly: Story = {
	args: {
		children: (
			<dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<AppDetailField label="Slogan">Hike the cascades</AppDetailField>
				<AppDetailField label="Short description">
					Day hikes and overnight treks in the Cascade range.
				</AppDetailField>
			</dl>
		),
	},
};

export const Loading: Story = {
	args: { children: <AppFormSkeleton rows={2} card={false} /> },
};
