import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppBadge } from "./AppBadge";

describe("AppBadge", () => {
	it("takes the button's corner, not the vendored pill", () => {
		renderWithProviders(<AppBadge>Draft</AppBadge>);
		const badge = screen.getByText("Draft");
		expect(badge).toHaveClass("rounded-lg");
		expect(badge).not.toHaveClass("rounded-4xl");
	});

	it("keeps a caller's own classes beside the corner", () => {
		renderWithProviders(<AppBadge className="w-10 font-mono">en</AppBadge>);
		const badge = screen.getByText("en");
		expect(badge).toHaveClass("rounded-lg", "w-10", "font-mono");
	});
});
