import { ArrowLeft, FileQuestion, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useUiLabels } from "../../providers/labels";
import { Button } from "../ui/button";
import { AppEmptyState } from "./AppEmptyState";

export function AppNotFound({
	resource,
	icon = FileQuestion,
	description,
	action,
	onBack,
}: {
	resource: string;
	icon?: LucideIcon;
	description?: string;
	action?: ReactNode;
	onBack: () => void;
}) {
	const labels = useUiLabels();
	return (
		<AppEmptyState
			icon={icon}
			title={labels.notFound(resource)}
			description={description ?? labels.resourceNotFound}
			action={
				action ?? (
					<Button variant="outline" onClick={onBack}>
						<ArrowLeft className="size-4" />
						{labels.goBack}
					</Button>
				)
			}
		/>
	);
}
