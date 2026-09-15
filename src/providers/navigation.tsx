import { createContext, type ReactNode, useContext } from "react";

export interface UiNavigation {
	back: () => void;
}

const UiNavigationContext = createContext<UiNavigation | null>(null);

export const UiNavigationProvider = ({
	navigation,
	children,
}: {
	navigation: UiNavigation;
	children: ReactNode;
}) => (
	<UiNavigationContext.Provider value={navigation}>
		{children}
	</UiNavigationContext.Provider>
);

export const useUiNavigation = (): UiNavigation => {
	const navigation = useContext(UiNavigationContext);
	if (!navigation) {
		throw new Error(
			"useUiNavigation must be used within a UiNavigationProvider",
		);
	}
	return navigation;
};
