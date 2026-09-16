import { useQuery } from "@tanstack/react-query";
import { useUiData } from "../providers/data";

export const useResource = <T>(
	queryKey: readonly unknown[],
	url: string,
	{ enabled = true }: { enabled?: boolean } = {},
) => {
	const { get } = useUiData();
	return useQuery({
		enabled,
		queryKey,
		queryFn: ({ signal }) => get<T>(url, { signal }),
	});
};
