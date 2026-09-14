import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { stubColumn } from "../../test/column";
import { clientFrom, pagedClient } from "../../test/data";
import { renderWithProviders } from "../../test/test-utils";
import { AppAsyncSetFilter } from "./AppAsyncSetFilter";

interface Row {
	name: string;
}

const ENDPOINT = "/tour-operators/op-1/members";
const KEY = ["members", "op-1"] as const;

const labels = () =>
	screen
		.getAllByRole("checkbox")
		.map((box) => box.closest("label")?.textContent);

describe("AppAsyncSetFilter", () => {
	it("offers the drained options deduped and sorted by label", async () => {
		const { client } = pagedClient([
			{ data: [{ id: "1", name: "Zoe" }], nextCursor: "c1" },
			{
				data: [
					{ id: "2", name: "Ada" },
					{ id: "1", name: "Zoe" },
				],
				nextCursor: null,
			},
		]);
		const { context } = stubColumn<Row>();
		renderWithProviders(
			<AppAsyncSetFilter
				headerContext={context()}
				endpoint={ENDPOINT}
				queryKey={KEY}
			/>,
			{ client },
		);

		await waitFor(() => expect(labels()).toEqual(["Ada", "Zoe"]));
	});

	it("writes the chosen values to the column", async () => {
		const { client } = pagedClient([
			{
				data: [
					{ id: "2", name: "Ada" },
					{ id: "1", name: "Zoe" },
				],
				nextCursor: null,
			},
		]);
		const user = userEvent.setup();
		const { context, setFilterValue } = stubColumn<Row>();
		renderWithProviders(
			<AppAsyncSetFilter
				headerContext={context()}
				endpoint={ENDPOINT}
				queryKey={KEY}
			/>,
			{ client },
		);

		await user.click(await screen.findByRole("checkbox", { name: "Ada" }));

		expect(setFilterValue).toHaveBeenLastCalledWith({
			operator: "in",
			values: ["2"],
		});
	});

	it("surfaces the failure and offers a retry rather than an empty list", async () => {
		let attempt = 0;
		const client = clientFrom(async <R,>() => {
			attempt += 1;
			if (attempt === 1) throw new Error("refused");
			return { data: [{ id: "1", name: "Ada" }], nextCursor: null } as R;
		});
		const user = userEvent.setup();
		const { context } = stubColumn<Row>();
		renderWithProviders(
			<AppAsyncSetFilter
				headerContext={context()}
				endpoint={ENDPOINT}
				queryKey={KEY}
			/>,
			{ client },
		);

		await waitFor(() =>
			expect(screen.getByRole("button", { name: /try again/i })).toBeVisible(),
		);
		expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /try again/i }));

		await waitFor(() => expect(screen.getByRole("checkbox")).toBeVisible());
	});
});
