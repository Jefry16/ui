import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { AppStaticTable, type AppStaticTableColumn } from "./AppStaticTable";

interface Tier {
	audience: string;
	capacity: number;
}

const columns: AppStaticTableColumn<Tier>[] = [
	{ id: "audience", header: "Audience", cell: (t) => t.audience },
	{
		id: "capacity",
		header: "Capacity",
		cell: (t) => t.capacity,
		numeric: true,
	},
];

const rows: Tier[] = [
	{ audience: "Adults", capacity: 12 },
	{ audience: "Children", capacity: 6 },
];

describe("AppStaticTable", () => {
	it("right-aligns a numeric column, header and cells alike", () => {
		renderWithProviders(
			<AppStaticTable
				columns={columns}
				rows={rows}
				rowKey={(t) => t.audience}
			/>,
		);

		expect(screen.getByRole("columnheader", { name: "Capacity" })).toHaveClass(
			"text-right",
		);
		expect(screen.getByRole("cell", { name: "12" })).toHaveClass("text-right");
		expect(
			screen.getByRole("columnheader", { name: "Audience" }),
		).not.toHaveClass("text-right");
	});

	it("renders every row beneath the header, in the given order", () => {
		renderWithProviders(
			<AppStaticTable
				columns={columns}
				rows={rows}
				rowKey={(t) => t.audience}
			/>,
		);

		expect(screen.getAllByRole("row").map((row) => row.textContent)).toEqual([
			"AudienceCapacity",
			"Adults12",
			"Children6",
		]);
	});
});
