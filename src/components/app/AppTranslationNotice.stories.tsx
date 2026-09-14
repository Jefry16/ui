import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppTranslationNotice } from "./AppTranslationNotice";

const meta = {
	title: "Shared/AppTranslationNotice",
	component: AppTranslationNotice,
} satisfies Meta<typeof AppTranslationNotice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
