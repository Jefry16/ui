import { useQuery } from "@tanstack/react-query";
import { useUiData } from "../providers/data";

export const useResource = <T>(queryKey: readonly unknown[], url: string) => {
	const { get } = useUiData();
	return useQuery({
		queryKey,
		queryFn: ({ signal }) => get<T>(url, { signal }),
	});
};
