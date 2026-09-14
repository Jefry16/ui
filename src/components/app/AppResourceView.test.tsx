import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { QueryState } from "../../data/query-state";
import type { UiDataClient } from "../../providers/data";
import { errorMessage } from "../../test/data";
import { renderWithProviders } from "../../test/test-utils";
import { AppResourceView } from "./AppResourceView";

interface Thing {
	name: string;
}

const state = (over: Partial<QueryState<Thing>>): QueryState<Thing> => ({
	data: undefined,
	isPending: false,
	error: null,
	refetch: vi.fn(),
	...over,
});

class Gone extends Error {}

const client: UiDataClient = {
	get: async () => {
		throw new Error("unused");
	},
	errorMessage,
	isNotFound: (error) => error instanceof Gone,
};

const view = (query: QueryState<Thing>) => (
	<AppResourceView query={query} resource="Thing" loading={<p>Loading</p>}>
		{(thing) => <p>{thing.name}</p>}
	</AppResourceView>
);

describe("AppResourceView", () => {
	it("keeps the header while pending", () => {
		renderWithProviders(view(state({ isPending: true })), { client });
		expect(screen.getByRole("heading", { name: "Thing" })).toBeVisible();
		expect(screen.getByText("Loading")).toBeVisible();
	});

	it("asks the client whether an error means not found, and shows that state", async () => {
		const back = vi.fn();
		renderWithProviders(view(state({ error: new Gone("404") })), {
			client,
			navigation: { back },
		});
		expect(screen.getByRole("heading", { name: "Thing" })).toBeVisible();
		expect(screen.getByText("Thing not found")).toBeVisible();
		await userEvent.click(screen.getByRole("button", { name: /go back/i }));
		expect(back).toHaveBeenCalled();
	});

	it("shows any other refusal with the client's sentence and a retry", async () => {
		const refetch = vi.fn();
		renderWithProviders(
			view(state({ error: new Error("Refused here"), refetch })),
			{ client },
		);
		expect(screen.getByText("Refused here")).toBeVisible();
		await userEvent.click(screen.getByRole("button", { name: /try again/i }));
		expect(refetch).toHaveBeenCalled();
	});

	it("hands the loaded record to the body and drops the header it drew", () => {
		renderWithProviders(view(state({ data: { name: "Kayak tour" } })), {
			client,
		});
		expect(screen.getByText("Kayak tour")).toBeVisible();
		expect(screen.queryByRole("heading", { name: "Thing" })).toBeNull();
	});
});
