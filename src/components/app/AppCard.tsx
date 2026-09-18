import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../ui/card";

export type AppCardVariant = "default" | "notice";

const CONTENT: Record<AppCardVariant, string | undefined> = {
	default: undefined,
	notice: "flex flex-col items-center gap-2 py-10 text-center",
};

export interface AppCardProps {
	title?: string;
	action?: ReactNode;
	variant?: AppCardVariant;
	className?: string;
	children: ReactNode;
}

export const AppCard = ({
	title,
	action,
	variant = "default",
	className,
	children,
}: AppCardProps) => (
	<Card>
		{title && (
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				{action && <CardAction className="self-center">{action}</CardAction>}
			</CardHeader>
		)}
		<CardContent className={cn(CONTENT[variant], className)}>
			{children}
		</CardContent>
	</Card>
);
