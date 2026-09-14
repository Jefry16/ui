import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { clientFrom, pagedClient } from "../test/data";
import {
	createTestQueryClient,
	wrapperWithProviders,
} from "../test/test-utils";
import { type Page, useAllPages } from "./use-all-pages";

const ENDPOINT = "/tour-operators/op-1/audiences";
const KEY = ["audiences", "op-1"] as const;

interface Row {
	id: string;
}

const render = (pages: Page<Row>[], options?: { enabled?: boolean }) => {
	const paged = pagedClient(pages);
	const { Wrapper } = wrapperWithProviders({ client: paged.client });
	const hook = renderHook(() => useAllPages<Row>(KEY, ENDPOINT, options), {
		wrapper: Wrapper,
	});
	return { ...hook, ...paged };
};

const ids = (rows: Row[] | undefined) => rows?.map((r) => r.id);

describe("useAllPages", () => {
	it("drains every page and flattens the rows in order", async () => {
		const { result, cursors } = render([
			{ data: [{ id: "a" }, { id: "b" }], nextCursor: "c1" },
			{ data: [{ id: "c" }], nextCursor: "c2" },
			{ data: [{ id: "d" }], nextCursor: null },
		]);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(ids(result.current.data)).toEqual(["a", "b", "c", "d"]);
		expect(cursors).toEqual([null, "c1", "c2"]);
	});

	it("never hands back a half-drained list as if it were complete", async () => {
		const { client } = pagedClient<Row>([
			{ data: [{ id: "a" }], nextCursor: "c1" },
			{ data: [{ id: "b" }], nextCursor: "c2" },
			{ data: [{ id: "c" }], nextCursor: null },
		]);
		const seen: { pending: boolean; rows: number | null }[] = [];
		const { Wrapper } = wrapperWithProviders({ client });

		const { result } = renderHook(
			() => {
				const state = useAllPages<Row>(KEY, ENDPOINT);
				seen.push({
					pending: state.isPending,
					rows: state.data?.length ?? null,
				});
				return state;
			},
			{ wrapper: Wrapper },
		);

		await waitFor(() => expect(result.current.isPending).toBe(false));

		expect(seen.filter((s) => s.rows !== null && s.rows !== 3)).toEqual([]);
		expect(ids(result.current.data)).toEqual(["a", "b", "c"]);
	});

	it("url-encodes the cursor", async () => {
		const { result, cursors, urls } = render([
			{ data: [{ id: "a" }], nextCursor: "a b&c" },
			{ data: [{ id: "b" }], nextCursor: null },
		]);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(cursors).toEqual([null, "a b&c"]);
		expect(urls[1]).toBe(`${ENDPOINT}?cursor=a%20b%26c`);
	});

	it("joins the cursor with & when the endpoint already carries a query", async () => {
		const urls: string[] = [];
		const client = clientFrom(async <R,>(url: string) => {
			urls.push(url.replace(ENDPOINT, ""));
			const cursor = new URL(url, "http://x").searchParams.get("cursor");
			return (
				cursor
					? { data: [{ id: "b" }], nextCursor: null }
					: { data: [{ id: "a" }], nextCursor: "c1" }
			) as R;
		});
		const { Wrapper } = wrapperWithProviders({ client });

		const { result } = renderHook(
			() => useAllPages<Row>(KEY, `${ENDPOINT}?filter[a][eq]=1`),
			{ wrapper: Wrapper },
		);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(urls).toEqual(["?filter[a][eq]=1", "?filter[a][eq]=1&cursor=c1"]);
	});

	it("makes no second request when the first page is the only one", async () => {
		const { result, cursors } = render([
			{ data: [{ id: "a" }], nextCursor: null },
		]);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(cursors).toEqual([null]);
	});

	it("treats an empty-string cursor as the last page, not a next one", async () => {
		const { result, cursors } = render([
			{ data: [{ id: "a" }], nextCursor: "" },
		]);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(ids(result.current.data)).toEqual(["a"]);
		expect(cursors).toEqual([null]);
	});

	it("stops rather than looping when a server repeats a cursor", async () => {
		const { result, cursors } = render([
			{ data: [{ id: "a" }], nextCursor: "c1" },
			{ data: [{ id: "b" }], nextCursor: "c1" },
		]);

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(cursors).toEqual([null, "c1"]);
		expect(ids(result.current.data)).toEqual(["a", "b"]);
	});

	it("surfaces a mid-pagination failure with no data, not eternal loading", async () => {
		let call = 0;
		const client = clientFrom(async <R,>() => {
			call += 1;
			if (call === 1) return { data: [{ id: "a" }], nextCursor: "c1" } as R;
			throw new Error("refused");
		});
		const { Wrapper } = wrapperWithProviders({ client });

		const { result } = renderHook(() => useAllPages<Row>(KEY, ENDPOINT), {
			wrapper: Wrapper,
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(result.current.isPending).toBe(false);
		expect(result.current.data).toBeUndefined();
	});

	it("recovers fully from a mid-drain failure once retried", async () => {
		let failOnce = true;
		const client = clientFrom(async <R,>(url: string) => {
			const cursor = new URL(url, "http://x").searchParams.get("cursor");
			if (!cursor) return { data: [{ id: "a" }], nextCursor: "c1" } as R;
			if (failOnce) {
				failOnce = false;
				throw new Error("refused");
			}
			return { data: [{ id: "b" }], nextCursor: null } as R;
		});
		const { Wrapper } = wrapperWithProviders({ client });
		const { result } = renderHook(() => useAllPages<Row>(KEY, ENDPOINT), {
			wrapper: Wrapper,
		});
		await waitFor(() => expect(result.current.isError).toBe(true));

		await act(async () => {
			result.current.refetch();
		});

		await waitFor(() => expect(result.current.isPending).toBe(false));
		expect(result.current.isError).toBe(false);
		expect(ids(result.current.data)).toEqual(["a", "b"]);
	});

	it("does not fetch at all until it is enabled", async () => {
		const { result, cursors } = render(
			[{ data: [{ id: "a" }], nextCursor: null }],
			{ enabled: false },
		);

		await new Promise((r) => setTimeout(r, 150));
		expect(cursors).toEqual([]);
		expect(result.current.isPending).toBe(true);
		expect(result.current.data).toBeUndefined();
	});

	it("keeps two endpoints apart even when they share a key", async () => {
		const other = "/tour-operators/op-1/audiences/archived";
		const client = clientFrom(async <R,>(url: string) => {
			const id = url.startsWith(other) ? "archived" : "live";
			return { data: [{ id }], nextCursor: null } as R;
		});
		const { Wrapper } = wrapperWithProviders({ client });

		const { result } = renderHook(
			() => ({
				live: useAllPages<Row>(KEY, ENDPOINT),
				archived: useAllPages<Row>(KEY, other),
			}),
			{ wrapper: Wrapper },
		);

		await waitFor(() => expect(result.current.live.isPending).toBe(false));
		await waitFor(() => expect(result.current.archived.isPending).toBe(false));

		expect(ids(result.current.live.data)).toEqual(["live"]);
		expect(ids(result.current.archived.data)).toEqual(["archived"]);
	});

	it("does not re-drain on a remount inside its freshness window", async () => {
		const { client, cursors } = pagedClient<Row>([
			{ data: [{ id: "a" }], nextCursor: "c1" },
			{ data: [{ id: "b" }], nextCursor: null },
		]);
		const queryClient = createTestQueryClient();
		const { Wrapper } = wrapperWithProviders({ client, queryClient });

		const first = renderHook(() => useAllPages<Row>(KEY, ENDPOINT), {
			wrapper: Wrapper,
		});
		await waitFor(() => expect(first.result.current.isPending).toBe(false));
		expect(cursors).toHaveLength(2);
		first.unmount();

		const second = renderHook(() => useAllPages<Row>(KEY, ENDPOINT), {
			wrapper: Wrapper,
		});
		await waitFor(() => expect(second.result.current.isPending).toBe(false));
		await new Promise((r) => setTimeout(r, 100));

		expect(cursors).toHaveLength(2);
		expect(ids(second.result.current.data)).toEqual(["a", "b"]);
	});
});
