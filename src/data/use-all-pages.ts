import { useQuery } from "@tanstack/react-query";
import { useUiData } from "../providers/data";

const FRESH_FOR = 60_000;

export interface Page<T> {
	data: T[];
	nextCursor: string | null;
}

export const allPagesKey = (queryKey: readonly unknown[], endpoint: string) =>
	[...queryKey, "all-pages", endpoint] as const;

export const useAllPages = <T>(
	queryKey: readonly unknown[],
	endpoint: string,
	{ enabled = true }: { enabled?: boolean } = {},
) => {
	const { get } = useUiData();
	return useQuery({
		enabled,
		staleTime: FRESH_FOR,
		queryKey: allPagesKey(queryKey, endpoint),
		queryFn: async ({ signal }) => {
			const rows: T[] = [];
			const seen = new Set<string>();
			let cursor: string | null = null;
			do {
				const join = endpoint.includes("?") ? "&" : "?";
				const url: string = cursor
					? `${endpoint}${join}cursor=${encodeURIComponent(cursor)}`
					: endpoint;
				const page = await get<Page<T>>(url, { signal });
				rows.push(...page.data);
				cursor = page.nextCursor || null;
				if (cursor && seen.has(cursor)) break;
				if (cursor) seen.add(cursor);
			} while (cursor);
			return rows;
		},
	});
};
