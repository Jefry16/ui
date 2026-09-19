import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UiLabelsProvider } from "../../providers/labels";
import { testLabels } from "../../test/labels";
import { renderWithProviders } from "../../test/test-utils";
import { AppDatePicker } from "./AppDatePicker";

const mount = (value: string) => {
	const onValueChange = vi.fn();
	renderWithProviders(
		<>
			<label htmlFor="when">When</label>
			<AppDatePicker id="when" value={value} onValueChange={onValueChange} />
		</>,
	);
	return {
		onValueChange,
		trigger: screen.getByRole("button", { name: /When/ }),
	};
};

describe("AppDatePicker", () => {
	it("hands a picked day over as an ISO date", async () => {
		const { onValueChange, trigger } = mount("2026-08-01");
		const user = userEvent.setup();

		await user.click(trigger);
		await user.click(
			await screen.findByRole("button", { name: /August 15th/ }),
		);

		expect(onValueChange).toHaveBeenCalledWith("2026-08-15");
	});

	it("clears to an empty string when the selected day is picked again", async () => {
		const { onValueChange, trigger } = mount("2026-08-01");
		const user = userEvent.setup();

		await user.click(trigger);
		await user.click(await screen.findByRole("button", { name: /August 1st/ }));

		expect(onValueChange).toHaveBeenCalledWith("");
	});

	it("reads the value when there is one", () => {
		expect(mount("2026-08-01").trigger).toHaveTextContent("Aug 1, 2026");
	});

	it("reads the placeholder when there is none", () => {
		expect(mount("").trigger).toHaveTextContent("Pick a date");
	});

	it("formats the date in the provider's locale, not the runtime default", () => {
		render(
			<UiLabelsProvider labels={{ ...testLabels, locale: "es" }}>
				<label htmlFor="when">When</label>
				<AppDatePicker id="when" value="2026-08-01" onValueChange={vi.fn()} />
			</UiLabelsProvider>,
		);
		const expected = new Intl.DateTimeFormat("es", {
			dateStyle: "medium",
		}).format(new Date(2026, 7, 1));
		expect(screen.getByRole("button", { name: /When/ })).toHaveTextContent(
			expected,
		);
	});
});
