import type { Meta, StoryObj } from "@storybook/react-vite";
import { anchorLink } from "../../test/links";
import { createAppLinks } from "./AppLinks";

const { AppLink, AppBackLink, AppNewLink, AppResourceLink, AppBreadcrumb } =
	createAppLinks(anchorLink);

const meta = {
	title: "Components/AppLinks",
	component: AppLink,
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
	render: () => <AppLink to="/experiences">Experiences</AppLink>,
};

export const Back: Story = {
	render: () => (
		<AppBackLink to="/experiences">Back to experiences</AppBackLink>
	),
};

export const New: Story = {
	render: () => <AppNewLink to="/experiences/new">New experience</AppNewLink>,
};

export const Resource: Story = {
	render: () => (
		<AppResourceLink to="/experiences/1">Kayak tour</AppResourceLink>
	),
};

export const Breadcrumb: Story = {
	render: () => (
		<AppBreadcrumb
			items={[
				{ label: "Catalog" },
				{ label: "Experiences", to: "/experiences" },
				{ label: "Kayak tour" },
			]}
		/>
	),
};
