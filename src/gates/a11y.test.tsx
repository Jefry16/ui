import { useForm } from "@tanstack/react-form";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Languages, Pencil, Trash2 } from "lucide-react";
import { describe, it, vi } from "vitest";
import { AppCard } from "../components/app/AppCard";
import { AppComboboxField } from "../components/app/AppComboboxField";
import { AppDataTable } from "../components/app/AppDataTable";
import { AppDataTableHeader } from "../components/app/AppDataTableHeader";
import { AppDatePicker } from "../components/app/AppDatePicker";
import { AppDetailField } from "../components/app/AppDetailField";
import { AppDialogFooter } from "../components/app/AppDialogFooter";
import {
	type AppAction,
	AppPageActions,
} from "../components/app/AppPageActions";
import { AppSelect } from "../components/app/AppSelect";
import { AppSourceBlock } from "../components/app/AppSourceBlock";
import { timestampColumn } from "../components/app/table-columns";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { Field, FieldLabel } from "../components/ui/field";
import { SelectItem } from "../components/ui/select";
import { expectNoA11yViolations } from "../test/a11y";
import { clientFrom, pagedClient } from "../test/data";
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
			<AppCard>
				<AppPageActions actions={actions} canWrite />
			</AppCard>,
		);
		await expectNoA11yViolations(container);
	});

	it("a titled card with a header action is operable", async () => {
		const { container } = renderWithProviders(
			<AppCard
				title="Fields"
				action={
					<Button variant="outline" size="sm">
						Add field
					</Button>
				}
			>
				<dl>
					<AppDetailField label="Type">product</AppDetailField>
				</dl>
			</AppCard>,
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
	it("a combobox field is labelled closed and lists real options open", async () => {
		const rows = [
			{ id: "1", name: "Boat trips" },
			{ id: "2", name: "Hikes" },
		];
		const client = clientFrom(async <R,>(url: string) => {
			const byId = rows.find((row) => url === `/categories/${row.id}`);
			return (byId ?? { data: rows, nextCursor: null }) as R;
		});
		const Harness = () => {
			const form = useForm({
				defaultValues: { category: "1" as string | null },
			});
			return (
				<main>
					<form.Field name="category">
						{(field) => (
							<AppComboboxField
								field={field}
								label="Category"
								endpoint="/categories"
								queryKey={["a11y-categories"]}
								description="Optional."
							/>
						)}
					</form.Field>
				</main>
			);
		};
		const { container } = renderWithProviders(<Harness />, { client });
		await screen.findByText("Boat trips");
		await expectNoA11yViolations(container);

		await userEvent
			.setup()
			.click(screen.getByRole("combobox", { name: "Category" }));
		await screen.findByRole("option", { name: "Hikes" });
		await expectNoA11yViolations(container.ownerDocument.body);
	});
	it("a date picker is labelled closed and a real grid open", async () => {
		const { container } = renderWithProviders(
			<main>
				<Field>
					<FieldLabel htmlFor="when">Valid from</FieldLabel>
					<AppDatePicker
						id="when"
						value="2026-08-01"
						onValueChange={() => {}}
					/>
				</Field>
			</main>,
		);
		await expectNoA11yViolations(container);

		await userEvent
			.setup()
			.click(screen.getByRole("button", { name: "Valid from" }));
		await screen.findByRole("grid");
		await expectNoA11yViolations(container.ownerDocument.body);
	});
	it("a select is labelled closed and lists real options open", async () => {
		const { container } = renderWithProviders(
			<main>
				<Field>
					<FieldLabel htmlFor="currency">Currency</FieldLabel>
					<AppSelect id="currency" value="eur" onValueChange={() => {}}>
						<SelectItem value="eur">Euro</SelectItem>
						<SelectItem value="usd">US Dollar</SelectItem>
					</AppSelect>
				</Field>
			</main>,
		);
		await expectNoA11yViolations(container);

		await userEvent
			.setup()
			.click(screen.getByRole("combobox", { name: "Currency" }));
		await screen.findByRole("option", { name: "US Dollar" });
		await expectNoA11yViolations(screen.getByRole("listbox"));
	});
});
