import { ShieldOff } from "lucide-react";
import type { ReactNode } from "react";
import { useUiLabels } from "../../providers/labels";
import { AppCard } from "./AppCard";

export const AppNotPermitted = ({ action }: { action?: ReactNode }) => {
	const labels = useUiLabels();
	return (
		<AppCard variant="notice">
			<ShieldOff className="size-8 text-muted-foreground" />
			<p className="text-sm text-muted-foreground">{labels.noPermission}</p>
			{action}
		</AppCard>
	);
};
