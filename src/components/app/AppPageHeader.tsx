import type { ReactNode } from "react";

interface AppPageHeaderProps {
	title: string;
	description?: string;
	actions?: ReactNode;
	breadcrumb?: ReactNode;
}

export const AppPageHeader = ({
	title,
	description,
	actions,
	breadcrumb,
}: AppPageHeaderProps) => {
	return (
		<div className="flex flex-col gap-4">
			{breadcrumb}
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0 wrap-break-word">
					<h1 className="text-xl font-semibold">{title}</h1>
					{description && (
						<p className="mt-1 text-sm text-muted-foreground">{description}</p>
					)}
				</div>
				{actions && (
					<div className="flex shrink-0 flex-wrap items-center gap-2">
						{actions}
					</div>
				)}
			</div>
		</div>
	);
};
