import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppLabelledControl } from "./AppLabelledControl";

describe("AppLabelledControl", () => {
	it("names the control through htmlFor", () => {
		renderWithProviders(
			<AppLabelledControl label="Colour" code="custom.colour" htmlFor="c">
				<input id="c" />
			</AppLabelledControl>,
		);

		expect(screen.getByLabelText(/Colour/)).toHaveAttribute("id", "c");
	});

	it("is a fieldset named by its legend when there is no control to point at", () => {
		renderWithProviders(
			<AppLabelledControl label="Fields">
				<input aria-label="first" />
				<input aria-label="second" />
			</AppLabelledControl>,
		);

		expect(screen.getByRole("group", { name: "Fields" }).tagName).toBe(
			"FIELDSET",
		);
	});

	it("shows its errors only while invalid", () => {
		const errors = [{ message: "Too low" }];
		const { rerender } = renderWithProviders(
			<AppLabelledControl label="Adults" htmlFor="a" errors={errors}>
				<input id="a" />
			</AppLabelledControl>,
		);
		expect(screen.queryByRole("alert")).toBeNull();

		rerender(
			<AppLabelledControl label="Adults" htmlFor="a" errors={errors} invalid>
				<input id="a" />
			</AppLabelledControl>,
		);
		expect(screen.getByRole("alert")).toHaveTextContent("Too low");
	});
});
