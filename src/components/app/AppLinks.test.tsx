import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { anchorLink } from "../../test/links";
import { renderWithProviders } from "../../test/test-utils";
import { createAppLinks } from "./AppLinks";

const { AppNewLink, AppBreadcrumb } = createAppLinks(anchorLink);

describe("AppBreadcrumb", () => {
	it("truncates the current page's crumb, since the title below carries the full name", () => {
		renderWithProviders(
			<AppBreadcrumb
				items={[
					{ label: "Media", to: "/media" },
					{ label: "PI_Insurance_confirmation_Professional Indemnity.pdf" },
				]}
			/>,
		);
		expect(screen.getByText(/PI_Insurance/)).toHaveClass("truncate");
		expect(screen.getByRole("link", { name: "Media" })).not.toHaveClass(
			"truncate",
		);
	});
});

describe("AppNewLink", () => {
	it("takes the button's size, so a dialog can ask for the small one", () => {
		renderWithProviders(
			<AppNewLink to="/experiences/new" size="sm">
				New experience
			</AppNewLink>,
		);
		expect(
			screen.getByRole("link", { name: /new experience/i }),
		).toHaveAttribute("data-size", "sm");
	});
});
