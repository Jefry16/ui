import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppSegmentedControl } from "./AppSegmentedControl";

const OPTIONS = [
	{ value: "recurring", label: "Recurring" },
	{ value: "single", label: "One-time" },
] as const;

describe("AppSegmentedControl", () => {
	it("is a named group that always has one option chosen", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		renderWithProviders(
			<AppSegmentedControl
				label="Kind"
				value="recurring"
				onChange={onChange}
				options={OPTIONS}
			/>,
		);

		const group = screen.getByRole("radiogroup", { name: "Kind" });
		await user.click(within(group).getByRole("radio", { name: "Recurring" }));
		expect(onChange).not.toHaveBeenCalled();

		await user.click(screen.getByRole("radio", { name: "One-time" }));
		expect(onChange).toHaveBeenCalledWith("single");
	});
});
