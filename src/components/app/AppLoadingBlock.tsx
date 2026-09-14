import { cn } from "../../lib/utils";
import { Spinner } from "../ui/spinner";

export const AppLoadingBlock = ({ className }: { className?: string }) => (
	<div className={cn("flex justify-center py-10", className)}>
		<Spinner />
	</div>
);
