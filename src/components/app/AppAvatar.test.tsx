import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppAvatar } from "./AppAvatar";

describe("AppAvatar", () => {
	it("takes the one radius on the frame, its edge and the fallback, never the vendored circle", () => {
		renderWithProviders(<AppAvatar name="acme tours" />);
		const fallback = screen.getByText("A");
		const frame = fallback.parentElement as HTMLElement;
		expect(frame).toHaveClass("rounded-lg", "after:rounded-lg");
		expect(fallback).toHaveClass("rounded-lg");
		for (const part of [frame, fallback]) {
			expect(part.className).not.toMatch(/rounded-full/);
		}
	});
});
