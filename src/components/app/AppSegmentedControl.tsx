import type { ReactNode } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export interface SegmentedOption<T extends string> {
	value: T;
	label: ReactNode;
}

export const AppSegmentedControl = <T extends string>({
	label,
	value,
	onChange,
	options,
	size = "default",
}: {
	label: string;
	value: T;
	onChange: (value: T) => void;
	options: readonly SegmentedOption<T>[];
	size?: "default" | "sm";
}) => (
	<ToggleGroup
		type="single"
		variant="outline"
		spacing={0}
		size={size}
		aria-label={label}
		value={value}
		onValueChange={(next) => {
			if (next) onChange(next as T);
		}}
	>
		{options.map((option) => (
			<ToggleGroupItem key={option.value} value={option.value}>
				{option.label}
			</ToggleGroupItem>
		))}
	</ToggleGroup>
);
