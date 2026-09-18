import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppPageHeader } from "./AppPageHeader";

describe("AppPageHeader", () => {
	it("keeps the actions on one row beside a long title", () => {
		renderWithProviders(
			<AppPageHeader
				title="PI_Insurance_confirmation_Professional Indemnity for Digital Professions_205964 (2).pdf"
				actions={<button type="button">Edit</button>}
			/>,
		);
		const actions = screen.getByRole("button", { name: "Edit" }).parentElement;
		expect(actions).toHaveClass("shrink-0");
		expect(screen.getByRole("heading").parentElement).toHaveClass("min-w-0");
	});
});
