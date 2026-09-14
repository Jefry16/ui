import { useUiLabels } from "../../providers/labels";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Spinner } from "../ui/spinner";

export const AppDialogFooter = ({
	onConfirm,
	confirmLabel,
	disabled,
	pending,
	destructive,
}: {
	onConfirm: () => void;
	confirmLabel?: string;
	disabled?: boolean;
	pending?: boolean;
	destructive?: boolean;
}) => {
	const labels = useUiLabels();
	return (
		<DialogFooter>
			<DialogClose asChild>
				<Button type="button" variant="outline" disabled={pending}>
					{labels.cancel}
				</Button>
			</DialogClose>
			<Button
				type="button"
				variant={destructive ? "destructive" : "default"}
				disabled={disabled || pending}
				onClick={onConfirm}
			>
				{pending && <Spinner />}
				{confirmLabel ?? labels.saveChanges}
			</Button>
		</DialogFooter>
	);
};
