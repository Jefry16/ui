import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppSkeleton } from "./AppSkeleton";

describe("AppSkeleton", () => {
	it("draws one two-bar entry per row of the list", () => {
		const { container } = renderWithProviders(
			<AppSkeleton variant="list" rows={4} />,
		);

		expect(container.querySelectorAll("[data-slot=skeleton]")).toHaveLength(8);
	});
});
