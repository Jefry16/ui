import { ShieldOff } from "lucide-react";
import type { ReactNode } from "react";
import { useUiLabels } from "../../providers/labels";
import { Card, CardContent } from "../ui/card";

export const AppNotPermitted = ({ action }: { action?: ReactNode }) => {
	const labels = useUiLabels();
	return (
		<Card>
			<CardContent className="flex flex-col items-center gap-2 py-10 text-center">
				<ShieldOff className="size-8 text-muted-foreground" />
				<p className="text-sm text-muted-foreground">{labels.noPermission}</p>
				{action}
			</CardContent>
		</Card>
	);
};
