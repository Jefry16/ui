import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppTranslationSummary } from "./AppTranslationSummary";

const meta = {
	title: "Shared/AppTranslationSummary",
	component: AppTranslationSummary,
	args: {
		fields: [
			["Name", "Paseo en velero al atardecer"],
			["Description", "Dos horas de navegación con vistas a la bahía."],
			["Slug", "paseo-velero-atardecer"],
		],
	},
	decorators: [
		(Story) => (
			<div className="mx-auto w-full max-w-3xl">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof AppTranslationSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PartlyTranslated: Story = {
	args: {
		fields: [
			["Name", "Paseo en velero al atardecer"],
			["Description", null],
			["Slug", null],
		],
	},
};
