import type { HeaderContext } from "@tanstack/react-table";
import { type PathRow, readPath } from "../../data/read-path";
import { useAllPages } from "../../data/use-all-pages";
import { AppLoadingBlock } from "./AppLoadingBlock";
import { AppQueryState } from "./AppQueryState";
import { AppSetFilter, type SetFilterItem } from "./AppSetFilter";

interface Props<TData> {
	headerContext: HeaderContext<TData, unknown>;
	endpoint: string;
	queryKey: readonly unknown[];
	valueKey?: string;
	labelKey?: string;
}

export function AppAsyncSetFilter<TData>({
	headerContext,
	endpoint,
	queryKey,
	valueKey = "id",
	labelKey = "name",
}: Props<TData>) {
	const options = useAllPages<PathRow>(queryKey, endpoint);

	return (
		<AppQueryState
			query={options}
			loading={<AppLoadingBlock className="py-4" />}
		>
			{(rows) => {
				const seen = new Set<string>();
				const items: SetFilterItem[] = [];
				for (const row of rows) {
					const value = String(readPath(row, valueKey) ?? "");
					if (!value || seen.has(value)) continue;
					seen.add(value);
					items.push({
						value,
						label: String(readPath(row, labelKey) ?? value),
					});
				}
				items.sort((a, b) => a.label.localeCompare(b.label));

				return <AppSetFilter headerContext={headerContext} items={items} />;
			}}
		</AppQueryState>
	);
}
