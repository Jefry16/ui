import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { QueryState } from "../../data/query-state";
import { useUiData } from "../../providers/data";
import { AppError } from "./AppError";
import { AppNotFound } from "./AppNotFound";
import { AppPageHeader } from "./AppPageHeader";

interface Props<TData> {
	query: QueryState<TData>;
	resource: string;
	icon?: LucideIcon;
	breadcrumb?: ReactNode;
	notFoundAction?: ReactNode;
	loading: ReactNode;
	children: (data: TData) => ReactNode;
}

export function AppResourceView<TData>({
	query,
	resource,
	icon,
	breadcrumb,
	notFoundAction,
	loading,
	children,
}: Props<TData>) {
	const { errorMessage, isNotFound } = useUiData();
	if (isNotFound(query.error) || query.data === undefined) {
		if (query.isPending) {
			return (
				<>
					<AppPageHeader title={resource} breadcrumb={breadcrumb} />
					{loading}
				</>
			);
		}
		return (
			<>
				<AppPageHeader title={resource} breadcrumb={breadcrumb} />
				{isNotFound(query.error) ? (
					<AppNotFound
						resource={resource}
						icon={icon}
						action={notFoundAction}
					/>
				) : (
					<AppError
						description={errorMessage(query.error)}
						onRetry={() => query.refetch()}
					/>
				)}
			</>
		);
	}

	return children(query.data);
}
