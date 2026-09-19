import {
	CircleCheck,
	Info,
	type LucideIcon,
	OctagonX,
	TriangleAlert,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type AppAlertVariant = "destructive" | "warning" | "info" | "success";

const ICONS: Record<AppAlertVariant, LucideIcon> = {
	destructive: OctagonX,
	warning: TriangleAlert,
	info: Info,
	success: CircleCheck,
};

const COLORS: Record<AppAlertVariant, string> = {
	destructive: "border-destructive/25 bg-destructive/8 text-destructive",
	warning: "border-warning/25 bg-warning/8 text-warning",
	info: "border-info/25 bg-info/8 text-info",
	success: "border-success/25 bg-success/8 text-success",
};

interface AppAlertProps {
	variant?: AppAlertVariant;
	title?: string;
	description: string;
	className?: string;
}

export const AppAlert = ({
	variant = "destructive",
	title,
	description,
	className,
}: AppAlertProps) => {
	const Icon = ICONS[variant];
	return (
		<Alert
			className={cn(
				"*:data-[slot=alert-description]:text-foreground",
				COLORS[variant],
				className,
			)}
		>
			<Icon />
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{description}</AlertDescription>
		</Alert>
	);
};
