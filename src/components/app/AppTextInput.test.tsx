import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppTextInput } from "./AppTextInput";

describe("AppTextInput", () => {
	it("hands the typed text out as a string, not an event", async () => {
		const onValueChange = vi.fn();
		renderWithProviders(
			<AppTextInput
				aria-label="title"
				value=""
				onValueChange={onValueChange}
			/>,
		);

		await userEvent.type(screen.getByLabelText("title"), "a");

		expect(onValueChange).toHaveBeenCalledWith("a");
	});
});
