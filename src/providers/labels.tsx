import { createContext, type ReactNode, useContext } from "react";

export type TextOperator =
	| "eq"
	| "neq"
	| "contains"
	| "not_contains"
	| "starts_with"
	| "ends_with";

export interface UiLabels {
	locale: string;
	cancel: string;
	saveChanges: string;
	clear: string;
	search: string;
	noResults: string;
	loadMore: string;
	notSet: string;
	nSelected: (count: number) => string;
	textOperators: Record<TextOperator, string>;
	moreActions: string;
	loadFailed: string;
	retry: string;
	noPermission: string;
	pickADate: string;
	pickATime: string;
	hour: string;
	minute: string;
	showPassword: string;
	hidePassword: string;
	translated: string;
	notTranslated: string;
	translation: string;
	translationFallbackHelp: string;
	notFound: (resource: string) => string;
	resourceNotFound: string;
	goBack: string;
	filterColumn: (column: string) => string;
	resourceCreated: (resource: string) => string;
	resourceUpdated: (resource: string) => string;
	resourceDeleted: (resource: string) => string;
}

const UiLabelsContext = createContext<UiLabels | null>(null);

export const UiLabelsProvider = ({
	labels,
	children,
}: {
	labels: UiLabels;
	children: ReactNode;
}) => (
	<UiLabelsContext.Provider value={labels}>{children}</UiLabelsContext.Provider>
);

export const useUiLabels = (): UiLabels => {
	const labels = useContext(UiLabelsContext);
	if (!labels) {
		throw new Error("useUiLabels must be used within a UiLabelsProvider");
	}
	return labels;
};
