import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UiLabelsProvider } from "../../providers/labels";
import { testLabels } from "../../test/labels";
import { AppTimeField } from "./AppTimeField";

const field = (value: string) => ({
	name: "startsAt",
	state: { value, meta: { isTouched: false, errors: [] } },
	handleChange: vi.fn(),
	handleBlur: vi.fn(),
});

describe("AppTimeField", () => {
	it("formats the time in the provider's locale, not the runtime default", () => {
		render(
			<UiLabelsProvider labels={{ ...testLabels, locale: "es" }}>
				<AppTimeField
					// biome-ignore lint/suspicious/noExplicitAny: a minimal field stand-in
					field={field("14:30") as any}
					label="Starts at"
				/>
			</UiLabelsProvider>,
		);
		const expected = new Intl.DateTimeFormat("es", {
			hour: "numeric",
			minute: "2-digit",
		}).format(new Date(2024, 0, 1, 14, 30));
		expect(screen.getByRole("button", { name: /Starts at/ })).toHaveTextContent(
			expected,
		);
	});
});
