import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { TooltipProvider } from "../components/ui/tooltip";
import { UiLabelsProvider } from "../shared/labels";
import { testLabels } from "./labels";

const Providers = ({ children }: { children: ReactNode }) => (
	<UiLabelsProvider labels={testLabels}>
		<TooltipProvider>{children}</TooltipProvider>
	</UiLabelsProvider>
);

export const renderWithProviders = (
	ui: ReactElement,
	options: Omit<RenderOptions, "wrapper"> = {},
) => render(ui, { ...options, wrapper: Providers });
