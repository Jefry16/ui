import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppAudiencePriceTable } from "./AppAudiencePriceTable";

const rows = [
	{ audienceId: "a", audienceName: "Adult", price: 45, capacity: 12 },
	{ audienceId: "i", audienceName: "Infant", price: 0, capacity: 4 },
];

describe("AppAudiencePriceTable", () => {
	it("names the audience and its price in the currency, a 0 as money, before a caller's columns", () => {
		renderWithProviders(
			<AppAudiencePriceTable
				rows={rows}
				currency="EUR"
				columns={[
					{
						id: "capacity",
						header: "Capacity",
						cell: (r) => r.capacity,
						numeric: true,
					},
				]}
			/>,
		);
		expect(
			screen.getAllByRole("columnheader").map((h) => h.textContent),
		).toEqual(["Audience", "Price", "Capacity"]);
		expect(screen.getByRole("row", { name: /adult/i })).toHaveTextContent(
			"€45.00",
		);
		expect(screen.getByRole("row", { name: /infant/i })).toHaveTextContent(
			"€0.00",
		);
		expect(screen.getByRole("cell", { name: "€45.00" })).toHaveClass(
			"text-right",
		);
	});
});
