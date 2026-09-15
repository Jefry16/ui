import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { anchorLink } from "../../test/links";
import { renderWithProviders } from "../../test/test-utils";
import { createAppLinks } from "./AppLinks";

const { AppNewLink } = createAppLinks(anchorLink);

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
