import type { ReactNode } from "react";
import type { QueryState } from "../../data/query-state";
import { useUiData } from "../../providers/data";
import { AppError } from "./AppError";

type Phase = "pending" | "error" | "loaded";

interface Props<TData> {
	query: QueryState<TData>;
	loading: ReactNode;
	chrome?: (body: ReactNode, phase: Phase) => ReactNode;
	children: (data: TData) => ReactNode;
}

const nothing = (body: ReactNode) => body == null || body === false;

export function AppQueryState<TData>({
	query,
	loading,
	chrome = (body) => body,
	children,
}: Props<TData>) {
	const { errorMessage } = useUiData();
	if (query.data === undefined) {
		if (query.isPending) return <>{chrome(loading, "pending")}</>;
		return (
			<>
				{chrome(
					<AppError
						description={errorMessage(query.error)}
						onRetry={() => query.refetch()}
					/>,
					"error",
				)}
			</>
		);
	}

	const body = children(query.data);
	return nothing(body) ? null : chrome(body, "loaded");
}
