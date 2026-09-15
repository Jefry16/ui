import { toast } from "sonner";
import { useUiLabels } from "../../providers/labels";

export const useAppToast = () => {
	const labels = useUiLabels();
	return {
		created: (resource: string) =>
			toast.success(labels.resourceCreated(resource)),
		updated: (resource: string) =>
			toast.success(labels.resourceUpdated(resource)),
		deleted: (resource: string) =>
			toast.success(labels.resourceDeleted(resource)),
		success: (message: string) => toast.success(message),
		error: (message: string) => toast.error(message),
	};
};
