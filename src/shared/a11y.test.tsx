import { Languages, Pencil, Trash2 } from "lucide-react";
import { describe, it, vi } from "vitest";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { expectNoA11yViolations } from "../test/a11y";
import { renderWithProviders } from "../test/test-utils";
import { AppDetailField } from "./components/AppDetailField";
import { AppDialogFooter } from "./components/AppDialogFooter";
import { type AppAction, AppPageActions } from "./components/AppPageActions";
import { AppSourceBlock } from "./components/AppSourceBlock";

describe("accessibility", () => {
	it("a facts list is a real description list", async () => {
		const { container } = renderWithProviders(
			<dl>
				<AppDetailField label="Handle">/pages/about</AppDetailField>
				<AppDetailField label="Created">9 Aug 2026</AppDetailField>
			</dl>,
		);
		await expectNoA11yViolations(container);
	});

	it("a capped source block is reachable and named", async () => {
		const { container } = renderWithProviders(
			<AppSourceBlock label="Page body">{"<p>Hello</p>"}</AppSourceBlock>,
		);
		await expectNoA11yViolations(container);
	});

	it("a dialog footer is labelled and operable", async () => {
		const { container } = renderWithProviders(
			<Dialog open>
				<DialogContent>
					<DialogTitle>Rename</DialogTitle>
					<AppDialogFooter onConfirm={vi.fn()} />
				</DialogContent>
			</Dialog>,
		);
		await expectNoA11yViolations(container.ownerDocument.body);
	});

	it("a page's action set is operable", async () => {
		const actions: AppAction[] = [
			{ id: "edit", label: "Edit", icon: Pencil, onSelect: vi.fn() },
			{
				id: "translations",
				label: "Translations",
				icon: Languages,
				member: true,
				onSelect: vi.fn(),
			},
			{
				id: "delete",
				label: "Delete",
				icon: Trash2,
				variant: "destructive",
				onSelect: vi.fn(),
			},
		];
		const { container } = renderWithProviders(
			<Card>
				<CardContent>
					<AppPageActions actions={actions} canWrite />
				</CardContent>
			</Card>,
		);
		await expectNoA11yViolations(container);
	});
});
