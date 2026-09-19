import type { AnyFieldApi } from "@tanstack/react-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";
import { type PathRow, readPath } from "../../data/read-path";
import type { Page } from "../../data/use-all-pages";
import { buildParams } from "../../data/use-data-table";
import { useDebouncedValue } from "../../data/use-debounced-value";
import { useResource } from "../../data/use-resource";
import { cn } from "../../lib/utils";
import { useUiData } from "../../providers/data";
import { useUiLabels } from "../../providers/labels";
import { Button } from "../ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { AppError } from "./AppError";
import { AppLoadingBlock } from "./AppLoadingBlock";

interface AppComboboxFieldProps {
	field: AnyFieldApi;
	label: string;
	endpoint: string;
	queryKey: readonly unknown[];
	filterKey?: string;
	labelKey?: string;
	valueKey?: string;
	placeholder?: string;
	description?: string;
	hideLabel?: boolean;
	clearable?: boolean;
}

interface Choice {
	value: string;
	label: string;
}

const SEARCH_DELAY = 300;
const CLEAR = " clear";
const MORE = " more";

const searchUrl = (
	endpoint: string,
	filterKey: string,
	search: string,
	cursor: string | null,
) => {
	const query = buildParams({
		cursor,
		sorting: [],
		filters: [
			{ id: filterKey, value: { operator: "contains", value: search } },
		],
		fieldMap: {},
	}).toString();
	if (!query) return endpoint;
	return `${endpoint}${endpoint.includes("?") ? "&" : "?"}${query}`;
};

const text = (row: PathRow, key: string, fallback: string) =>
	String(readPath(row, key) ?? fallback);

export const AppComboboxField = ({
	field,
	label,
	endpoint,
	queryKey,
	filterKey = "name",
	labelKey = "name",
	valueKey = "id",
	placeholder,
	description,
	hideLabel,
	clearable = true,
}: AppComboboxFieldProps) => {
	const labels = useUiLabels();
	const { get, errorMessage } = useUiData();
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [chosen, setChosen] = useState<Choice | null>(null);
	const debouncedSearch = useDebouncedValue(search.trim(), SEARCH_DELAY);

	const value: string | null = field.state.value || null;
	const known = chosen && chosen.value === value ? chosen : null;
	const selected = useResource<PathRow>(
		[...queryKey, "combobox", endpoint, "selected", value],
		`${endpoint}/${value}`,
		{ enabled: value !== null && known === null },
	);
	const options = useInfiniteQuery({
		queryKey: [...queryKey, "combobox", endpoint, filterKey, debouncedSearch],
		queryFn: ({ pageParam, signal }) =>
			get<Page<PathRow>>(
				searchUrl(endpoint, filterKey, debouncedSearch, pageParam),
				{ signal },
			),
		initialPageParam: null as string | null,
		getNextPageParam: (last) => last.nextCursor || null,
		enabled: open,
	});

	const isInvalid =
		field.state.meta.isTouched && field.state.meta.errors.length > 0;
	const shown =
		known?.label ??
		(value !== null && selected.data
			? text(selected.data, labelKey, value)
			: null);

	const choose = (next: Choice | null) => {
		setChosen(next);
		field.handleChange(next?.value ?? null);
		setOpen(false);
	};

	const rows = new Map<string, string>();
	for (const row of options.data?.pages.flatMap((page) => page.data) ?? []) {
		const rowValue = text(row, valueKey, "");
		if (rowValue && !rows.has(rowValue)) {
			rows.set(rowValue, text(row, labelKey, rowValue));
		}
	}

	const list = () => {
		if (options.data === undefined) {
			if (options.isPending) return <AppLoadingBlock className="py-4" />;
			return (
				<div className="p-4">
					<AppError
						description={errorMessage(options.error)}
						onRetry={() => options.refetch()}
					/>
				</div>
			);
		}
		return (
			<>
				{rows.size === 0 && (
					<p className="py-6 text-center text-sm text-muted-foreground">
						{labels.noResults}
					</p>
				)}
				<CommandGroup>
					{clearable && value !== null && (
						<CommandItem value={CLEAR} onSelect={() => choose(null)}>
							<X />
							{labels.clear}
						</CommandItem>
					)}
					{[...rows].map(([rowValue, rowLabel]) => (
						<CommandItem
							key={rowValue}
							value={rowValue}
							data-checked={rowValue === value ? "true" : undefined}
							onSelect={() => choose({ value: rowValue, label: rowLabel })}
						>
							{rowLabel}
						</CommandItem>
					))}
					{options.hasNextPage && (
						<CommandItem
							value={MORE}
							disabled={options.isFetchingNextPage}
							onSelect={() => options.fetchNextPage()}
						>
							{labels.loadMore}
						</CommandItem>
					)}
				</CommandGroup>
			</>
		);
	};

	return (
		<Field data-invalid={isInvalid || undefined}>
			<FieldLabel
				htmlFor={field.name}
				className={hideLabel ? "sr-only" : undefined}
			>
				{label}
			</FieldLabel>
			<Popover
				open={open}
				onOpenChange={(next) => {
					setOpen(next);
					if (!next) setSearch("");
				}}
			>
				<PopoverTrigger asChild>
					<Button
						type="button"
						variant="outline"
						role="combobox"
						id={field.name}
						aria-expanded={open}
						aria-invalid={isInvalid}
						onBlur={field.handleBlur}
						className="w-full justify-between font-normal"
					>
						<span className={cn("truncate", !shown && "text-muted-foreground")}>
							{shown ?? placeholder ?? labels.notSet}
						</span>
						<ChevronsUpDown className="text-muted-foreground" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align="start"
					aria-label={label}
					className="w-(--radix-popover-trigger-width) p-0"
				>
					<Command shouldFilter={false}>
						<CommandInput
							value={search}
							onValueChange={setSearch}
							placeholder={labels.search}
						/>
						<CommandList>{list()}</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};
