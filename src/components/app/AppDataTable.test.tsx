import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { clientFrom, pagedClient } from "../../test/data";
import { renderWithProviders } from "../../test/test-utils";
import { AppDataTable } from "./AppDataTable";
import { AppDataTableHeader } from "./AppDataTableHeader";

interface Row {
	id: string;
	name: string;
}

const columns = [
	{
		id: "name",
		enableSorting: true,
		header: (ctx: never) => (
			<AppDataTableHeader label="Name" headerContext={ctx} />
		),
		cell: () => null,
	},
	{
		id: "thumbnail",
		header: () => <span>Thumbnail</span>,
		cell: () => null,
	},
	// biome-ignore lint/suspicious/noExplicitAny: a column list for one render
] as any;

const renderTable = () => {
	const { client, urls } = pagedClient<Row>([
		{ data: [{ id: "1", name: "One" }], nextCursor: null },
	]);
	renderWithProviders(
		<AppDataTable<Row>
			columns={columns}
			endpoint="/things"
			queryKey={["things"]}
			emptyState={{ title: "Nothing", description: "" }}
		/>,
		{ client },
	);
	return { urls };
};

describe("AppDataTable when the list is refused", () => {
	it("shows the client's sentence with a retry, and asks again on retry", async () => {
		let calls = 0;
		const client = clientFrom(async <R,>() => {
			calls += 1;
			if (calls === 1) throw new Error("Method not allowed here");
			return { data: [], nextCursor: null } as R;
		});
		renderWithProviders(
			<AppDataTable<Row>
				columns={columns}
				endpoint="/things"
				queryKey={["things"]}
				emptyState={{ title: "Nothing", description: "" }}
			/>,
			{ client },
		);

		expect(await screen.findByText("Method not allowed here")).toBeVisible();

		await userEvent.click(screen.getByRole("button", { name: /try again/i }));

		expect(await screen.findByText("Nothing")).toBeVisible();
		expect(calls).toBe(2);
	});
});

describe("AppDataTable sorting semantics", () => {
	it("announces the sort state, and only on sortable columns", async () => {
		renderTable();

		const name = await screen.findByRole("columnheader", { name: /name/i });
		const thumb = screen.getByRole("columnheader", { name: /thumbnail/i });

		expect(name).toHaveAttribute("aria-sort", "none");
		expect(thumb).not.toHaveAttribute("aria-sort");

		await userEvent.click(screen.getByRole("button", { name: /name/i }));
		expect(name).toHaveAttribute("aria-sort", "ascending");

		await userEvent.click(screen.getByRole("button", { name: /name/i }));
		expect(name).toHaveAttribute("aria-sort", "descending");
	});

	it("sends the sort to the endpoint as the list grammar says", async () => {
		const { urls } = renderTable();
		await screen.findByRole("columnheader", { name: /name/i });

		await userEvent.click(screen.getByRole("button", { name: /name/i }));
		await screen.findByRole("columnheader", { name: /name/i });
		await userEvent.click(screen.getByRole("button", { name: /name/i }));

		expect(urls).toEqual([
			"/things",
			"/things?sort=name",
			"/things?sort=-name",
		]);
	});

	it("offers a sort control only where the column enables it", async () => {
		renderTable();
		await screen.findByRole("columnheader", { name: /name/i });

		expect(screen.getByRole("button", { name: /name/i })).toBeInTheDocument();
		expect(screen.queryByRole("button", { name: /thumbnail/i })).toBeNull();
	});
});
