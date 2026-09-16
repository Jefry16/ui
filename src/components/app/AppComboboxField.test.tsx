import { useForm } from "@tanstack/react-form";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { clientFrom, pagedClient } from "../../test/data";
import { renderWithProviders } from "../../test/test-utils";
import { AppComboboxField } from "./AppComboboxField";

const ENDPOINT = "/tour-operators/op-1/categories";
const KEY = ["categories", "op-1"] as const;

const Harness = ({ initial }: { initial: string | null }) => {
	const form = useForm({ defaultValues: { category: initial } });
	return (
		<>
			<form.Field name="category">
				{(field) => (
					<AppComboboxField
						field={field}
						label="Category"
						endpoint={ENDPOINT}
						queryKey={KEY}
						placeholder="Pick one"
					/>
				)}
			</form.Field>
			<form.Subscribe selector={(state) => state.values.category}>
				{(category) => <output>{JSON.stringify(category)}</output>}
			</form.Subscribe>
		</>
	);
};

const trigger = () => screen.getByRole("combobox", { name: "Category" });
const value = () => screen.getByRole("status").textContent;
const decoded = (urls: string[]) => urls.map((url) => decodeURIComponent(url));

const ONE_PAGE = [
	{
		data: [
			{ id: "1", name: "Boat trips" },
			{ id: "2", name: "Hikes" },
		],
		nextCursor: null,
	},
];

describe("AppComboboxField", () => {
	it("lists the first page unfiltered, then searches the backend as you type", async () => {
		const { client, urls } = pagedClient(ONE_PAGE);
		const user = userEvent.setup();
		renderWithProviders(<Harness initial={null} />, { client });

		await user.click(trigger());
		await screen.findByRole("option", { name: "Boat trips" });
		expect(decoded(urls)).toEqual([ENDPOINT]);

		await user.type(screen.getByPlaceholderText("Search"), "boa");

		await waitFor(() =>
			expect(decoded(urls)).toContain(`${ENDPOINT}?filter[name][contains]=boa`),
		);
		expect(decoded(urls)).toHaveLength(2);
	});

	it("loads the next page through the cursor, and a pick needs no lookup", async () => {
		const { client, urls, cursors } = pagedClient([
			{ data: [{ id: "1", name: "Boat trips" }], nextCursor: "c1" },
			{ data: [{ id: "2", name: "Hikes" }], nextCursor: null },
		]);
		const user = userEvent.setup();
		renderWithProviders(<Harness initial={null} />, { client });

		await user.click(trigger());
		await user.click(await screen.findByRole("option", { name: "Load more" }));
		await screen.findByRole("option", { name: "Hikes" });
		expect(cursors).toEqual([null, "c1"]);
		expect(
			screen.queryByRole("option", { name: "Load more" }),
		).not.toBeInTheDocument();

		await user.click(screen.getByRole("option", { name: "Hikes" }));

		expect(value()).toBe('"2"');
		expect(trigger()).toHaveTextContent("Hikes");
		expect(urls.filter((url) => url.endsWith("/2"))).toEqual([]);
	});

	it("names a value that is not among the loaded rows by fetching it", async () => {
		const client = clientFrom(async <R,>(url: string) => {
			if (url === `${ENDPOINT}/cat-9`)
				return { id: "cat-9", name: "Whale watching" } as R;
			return ONE_PAGE[0] as R;
		});
		renderWithProviders(<Harness initial="cat-9" />, { client });

		await waitFor(() => expect(trigger()).toHaveTextContent("Whale watching"));
	});

	it("clears to null, never to an empty string", async () => {
		const client = clientFrom(async <R,>(url: string) => {
			if (url === `${ENDPOINT}/1`) return { id: "1", name: "Boat trips" } as R;
			return ONE_PAGE[0] as R;
		});
		const user = userEvent.setup();
		renderWithProviders(<Harness initial="1" />, { client });
		await waitFor(() => expect(trigger()).toHaveTextContent("Boat trips"));

		await user.click(trigger());
		await user.click(await screen.findByRole("option", { name: "Clear" }));

		expect(value()).toBe("null");
		expect(trigger()).toHaveTextContent("Pick one");
	});

	it("says why the list failed and offers a retry", async () => {
		let attempt = 0;
		const client = clientFrom(async <R,>() => {
			attempt += 1;
			if (attempt === 1) throw new Error("refused");
			return ONE_PAGE[0] as R;
		});
		const user = userEvent.setup();
		renderWithProviders(<Harness initial={null} />, { client });

		await user.click(trigger());
		await screen.findByText("refused");

		await user.click(screen.getByRole("button", { name: "Try again" }));

		await screen.findByRole("option", { name: "Boat trips" });
	});
});
