import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface AppEmptyStateProps {
	icon?: LucideIcon;
	title: string;
	description?: string;
	action?: ReactNode;
	variant?: "block" | "inline";
}

export function AppEmptyState({
	icon: Icon,
	title,
	description,
	action,
	variant = "block",
}: AppEmptyStateProps) {
	if (variant === "inline") {
		return (
			<div className="flex flex-col items-start gap-2">
				<p className="text-sm text-muted-foreground">{title}</p>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
				{action}
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center gap-3 text-center">
			{Icon && (
				<div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
					<Icon className="size-8" />
				</div>
			)}
			<div className="space-y-1">
				<h3 className="text-lg font-semibold">{title}</h3>
				{description && (
					<p className="text-sm text-muted-foreground">{description}</p>
				)}
			</div>
			{action}
		</div>
	);
}
