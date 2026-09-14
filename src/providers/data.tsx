import { createContext, type ReactNode, useContext } from "react";

export interface UiDataClient {
	get: <T>(url: string, options?: { signal?: AbortSignal }) => Promise<T>;
	errorMessage: (error: unknown) => string;
	isNotFound: (error: unknown) => boolean;
}

const UiDataContext = createContext<UiDataClient | null>(null);

export const UiDataProvider = ({
	client,
	children,
}: {
	client: UiDataClient;
	children: ReactNode;
}) => (
	<UiDataContext.Provider value={client}>{children}</UiDataContext.Provider>
);

export const useUiData = (): UiDataClient => {
	const client = useContext(UiDataContext);
	if (!client) {
		throw new Error("useUiData must be used within a UiDataProvider");
	}
	return client;
};
