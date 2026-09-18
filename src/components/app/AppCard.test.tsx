import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppCard } from "./AppCard";

describe("AppCard", () => {
	it("puts the action in the header beside the title, not in the body", () => {
		renderWithProviders(
			<AppCard title="Fields" action={<button type="button">Add field</button>}>
				<p>body</p>
			</AppCard>,
		);

		const header = screen
			.getByText("Fields")
			.closest("[data-slot=card-header]");
		expect(header).not.toBeNull();
		expect(header).toContainElement(
			screen.getByRole("button", { name: "Add field" }),
		);
	});

	it("renders no header at all without a title", () => {
		const { container } = renderWithProviders(
			<AppCard>
				<p>body</p>
			</AppCard>,
		);

		expect(container.querySelector("[data-slot=card-header]")).toBeNull();
		expect(screen.getByText("body")).toBeInTheDocument();
	});
});
