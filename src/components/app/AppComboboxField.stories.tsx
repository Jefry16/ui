import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "@tanstack/react-form";
import { type UiDataClient, UiDataProvider } from "../../providers/data";
import { clientFrom } from "../../test/data";
import { AppComboboxField } from "./AppComboboxField";

const ENDPOINT = "/tour-operators/op-1/categories";

const ROWS = [
	{ id: "1", name: "Boat trips" },
	{ id: "2", name: "Hikes" },
	{ id: "3", name: "Whale watching" },
	{ id: "4", name: "City walks" },
];

const catalogue = clientFrom(async <R,>(url: string) => {
	const byId = ROWS.find((row) => url === `${ENDPOINT}/${row.id}`);
	if (byId) return byId as R;
	const params = new URL(url, "http://x").searchParams;
	const search = params.get("filter[name][contains]")?.toLowerCase() ?? "";
	const matching = ROWS.filter((row) =>
		row.name.toLowerCase().includes(search),
	);
	const cursor = params.get("cursor");
	const start = cursor ? Number(cursor) : 0;
	const page = matching.slice(start, start + 2);
	const next = start + 2 < matching.length ? String(start + 2) : null;
	return { data: page, nextCursor: next } as R;
});

const refusing = clientFrom(async () => {
	throw new Error("The server refused the request.");
});

const Harness = ({
	client,
	initial,
}: {
	client: UiDataClient;
	initial: string | null;
}) => {
	const form = useForm({ defaultValues: { category: initial } });
	return (
		<UiDataProvider client={client}>
			<div className="w-80">
				<form.Field name="category">
					{(field) => (
						<AppComboboxField
							field={field}
							label="Category"
							endpoint={ENDPOINT}
							queryKey={["categories", "op-1"]}
							placeholder="Pick a category"
							description="Type to search; two rows per page."
						/>
					)}
				</form.Field>
			</div>
		</UiDataProvider>
	);
};

const meta = {
	title: "Components/AppComboboxField",
	component: AppComboboxField,
} satisfies Meta<typeof AppComboboxField>;

export default meta;
type Story = StoryObj<Record<string, never>>;

export const Empty: Story = {
	render: () => <Harness client={catalogue} initial={null} />,
};

export const WithValue: Story = {
	render: () => <Harness client={catalogue} initial="3" />,
};

export const Failing: Story = {
	render: () => <Harness client={refusing} initial={null} />,
};
