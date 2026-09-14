import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";

const meta = {
	title: "Primitives/Field",
	component: Field,
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<FieldSet className="w-80">
			<FieldLegend>Shop details</FieldLegend>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="shop-name">Shop name</FieldLabel>
					<Input id="shop-name" placeholder="Fresh Tours" />
					<FieldDescription>Shown on your storefront.</FieldDescription>
				</Field>
				<Field data-invalid>
					<FieldLabel htmlFor="shop-email">Email</FieldLabel>
					<Input id="shop-email" aria-invalid defaultValue="not an email" />
					<FieldError>Please enter a valid email address</FieldError>
				</Field>
			</FieldGroup>
		</FieldSet>
	),
};

export const Horizontal: Story = {
	render: () => (
		<Field orientation="horizontal" className="w-80">
			<FieldLabel htmlFor="phone">Phone</FieldLabel>
			<Input id="phone" />
		</Field>
	),
};
