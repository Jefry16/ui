import type { Page } from "../data/use-all-pages";
import type { UiDataClient } from "../providers/data";

export const errorMessage = (error: unknown) =>
	error instanceof Error ? error.message : String(error);

/**
 * A client that serves the given pages in cursor order and records what it
 * was asked. `get` may be replaced per test for failures and other shapes.
 */
export const pagedClient = <T>(pages: Page<T>[]) => {
	const urls: string[] = [];
	const cursors: (string | null)[] = [];
	const client: UiDataClient = {
		get: async <R>(url: string) => {
			urls.push(url);
			if (urls.length > 50)
				throw new Error("runaway drain: more than 50 requests");
			const cursor = new URL(url, "http://x").searchParams.get("cursor");
			cursors.push(cursor);
			const index = cursor
				? pages.findIndex(
						(_, i) => i > 0 && pages[i - 1]?.nextCursor === cursor,
					)
				: 0;
			return (pages[index] ?? { data: [], nextCursor: null }) as R;
		},
		errorMessage,
	};
	return { client, urls, cursors };
};

export const clientFrom = (
	get: <R>(url: string, options?: { signal?: AbortSignal }) => Promise<R>,
): UiDataClient => ({ get, errorMessage });

const STORY_ROWS = [
	{ id: "1", name: "Ada", createdAt: "2026-08-09T10:00:00Z" },
	{ id: "2", name: "Zoe", createdAt: "2026-08-10T10:00:00Z" },
	{ id: "3", name: "Mira", createdAt: "2026-08-11T10:00:00Z" },
];

export const storyClient: UiDataClient = {
	get: async <R>() => ({ data: STORY_ROWS, nextCursor: null }) as unknown as R,
	errorMessage,
};
