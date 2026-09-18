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

	it("paints a state variant in its own colour with none of the red", () => {
		renderWithProviders(<AppBadge variant="success">Published</AppBadge>);
		const badge = screen.getByText("Published");
		expect(badge).toHaveClass("bg-success/8", "text-success");
		for (const red of [
			"bg-destructive/10",
			"text-destructive",
			"dark:bg-destructive/20",
			"[a]:hover:bg-destructive/20",
		]) {
			expect(badge).not.toHaveClass(red);
		}
	});

	it("lowers the vendored destructive tint to the alert's ground", () => {
		renderWithProviders(<AppBadge variant="destructive">Cancelled</AppBadge>);
		const badge = screen.getByText("Cancelled");
		expect(badge).toHaveClass("bg-destructive/8", "dark:bg-destructive/8");
		expect(badge).not.toHaveClass("bg-destructive/10");
		expect(badge).not.toHaveClass("dark:bg-destructive/20");
	});
});
