import type { Meta, StoryObj } from "@storybook/react-vite";
import { Languages, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { AppCard } from "./AppCard";
import { AppDetailField } from "./AppDetailField";

const facts = (
	<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
		<AppDetailField label="Handle">/pages/about</AppDetailField>
		<AppDetailField label="Created">9 Aug 2026</AppDetailField>
	</dl>
);

const meta = {
	title: "Components/AppCard",
	component: AppCard,
	args: { children: facts },
	decorators: [
		(Story) => (
			<div className="w-96">
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof AppCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};

export const Titled: Story = { args: { title: "Details" } };

export const WithAction: Story = {
	args: {
		title: "Fields",
		action: (
			<Button variant="outline" size="sm">
				<Plus />
				Add field
			</Button>
		),
	},
};

export const Notice: Story = {
	args: {
		variant: "notice",
		children: (
			<>
				<Languages className="size-8 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">
					This storefront has one language, so there is nothing to translate.
				</p>
				<Button variant="link" size="sm">
					Manage languages
				</Button>
			</>
		),
	},
};
