import { ArrowLeft, FileQuestion, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useUiLabels } from "../../providers/labels";
import { useUiNavigation } from "../../providers/navigation";
import { Button } from "../ui/button";
import { AppEmptyState } from "./AppEmptyState";

export function AppNotFound({
	resource,
	icon = FileQuestion,
	description,
	action,
}: {
	resource: string;
	icon?: LucideIcon;
	description?: string;
	action?: ReactNode;
}) {
	const labels = useUiLabels();
	const { back } = useUiNavigation();
	return (
		<AppEmptyState
			icon={icon}
			title={labels.notFound(resource)}
			description={description ?? labels.resourceNotFound}
			action={
				action ?? (
					<Button variant="outline" onClick={back}>
						<ArrowLeft className="size-4" />
						{labels.goBack}
					</Button>
				)
			}
		/>
	);
}
