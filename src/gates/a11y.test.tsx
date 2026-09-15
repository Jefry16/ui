import { screen } from "@testing-library/react";
import { Languages, Pencil, Trash2 } from "lucide-react";
import { describe, it, vi } from "vitest";
import { AppDataTable } from "../components/app/AppDataTable";
import { AppDataTableHeader } from "../components/app/AppDataTableHeader";
import { AppDetailField } from "../components/app/AppDetailField";
import { AppDialogFooter } from "../components/app/AppDialogFooter";
import {
	type AppAction,
	AppPageActions,
} from "../components/app/AppPageActions";
import { AppSourceBlock } from "../components/app/AppSourceBlock";
import { timestampColumn } from "../components/app/table-columns";
import { Card, CardContent } from "../components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { expectNoA11yViolations } from "../test/a11y";
import { pagedClient } from "../test/data";
import { renderWithProviders } from "../test/test-utils";

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

	it("a table announces its sort state and names each filter", async () => {
		const { client } = pagedClient([
			{
				data: [{ id: "1", createdAt: "2026-08-09T10:00:00Z" }],
				nextCursor: null,
			},
		]);
		const { container } = renderWithProviders(
			<AppDataTable
				columns={[
					timestampColumn<{ id: string; createdAt: string }>(
						"createdAt",
						"Created",
						() => "9 Aug 2026",
					),
					{
						id: "name",
						enableSorting: true,
						// biome-ignore lint/suspicious/noExplicitAny: a column list for one render
						header: (ctx: any) => (
							<AppDataTableHeader
								label="Name"
								headerContext={ctx}
								allowFiltering="text"
							/>
						),
						cell: () => "One",
						// biome-ignore lint/suspicious/noExplicitAny: a column list for one render
					} as any,
				]}
				endpoint="/things"
				queryKey={["a11y-things"]}
				emptyState={{ title: "Nothing", description: "" }}
			/>,
			{ client },
		);
		await screen.findByText("9 Aug 2026");
		await expectNoA11yViolations(container);
	});
});
