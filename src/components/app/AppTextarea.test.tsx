import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppTextarea } from "./AppTextarea";

describe("AppTextarea", () => {
	it("hands the typed text out as a string, not an event", async () => {
		const onValueChange = vi.fn();
		renderWithProviders(
			<AppTextarea aria-label="alt" value="" onValueChange={onValueChange} />,
		);

		await userEvent.type(screen.getByLabelText("alt"), "a");

		expect(onValueChange).toHaveBeenCalledWith("a");
	});

	it("is three rows tall unless told otherwise", () => {
		renderWithProviders(
			<AppTextarea aria-label="alt" value="" onValueChange={vi.fn()} />,
		);

		expect(screen.getByLabelText("alt")).toHaveAttribute("rows", "3");
	});
});
