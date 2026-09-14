import type { ColumnDef } from "@tanstack/react-table";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { pagedClient } from "../../test/data";
import { renderWithProviders } from "../../test/test-utils";
import { AppDataTable } from "./AppDataTable";
import { timestampColumn } from "./table-columns";

interface Row {
	id: string;
	createdAt: string;
}

describe("timestampColumn", () => {
	it("renders through the caller's formatter and announces as sortable", async () => {
		const { client } = pagedClient<Row>([
			{
				data: [{ id: "1", createdAt: "2026-08-09T10:00:00Z" }],
				nextCursor: null,
			},
		]);

		renderWithProviders(
			<AppDataTable<Row>
				columns={
					[
						timestampColumn<Row>("createdAt", "Created", () => "9 Aug 2026"),
					] as ColumnDef<Row, unknown>[]
				}
				endpoint="/things"
				queryKey={["things"]}
				emptyState={{ title: "Nothing", description: "" }}
			/>,
			{ client },
		);

		expect(await screen.findByText("9 Aug 2026")).toBeInTheDocument();
		expect(
			screen.getByRole("columnheader", { name: /created/i }),
		).toHaveAttribute("aria-sort", "none");
	});
});
