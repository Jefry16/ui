import type { ReactNode } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export const AppFormActions = ({
	isPending,
	submitLabel,
	disabled,
	secondary,
}: {
	isPending: boolean;
	submitLabel: string;
	disabled?: boolean;
	secondary?: ReactNode;
}) => (
	<div className="flex justify-end gap-2">
		{secondary}
		<Button type="submit" disabled={isPending || disabled}>
			{isPending && <Spinner className="size-4" />}
			{submitLabel}
		</Button>
	</div>
);
