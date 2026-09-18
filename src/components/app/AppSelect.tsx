import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export interface AppSelectProps
	extends Omit<
		ComponentProps<typeof SelectTrigger>,
		"value" | "disabled" | "children"
	> {
	value: string;
	onValueChange: (value: string) => void;
	disabled?: boolean;
	placeholder?: string;
	children: ReactNode;
}

export const AppSelect = ({
	value,
	onValueChange,
	disabled,
	placeholder,
	className,
	children,
	...trigger
}: AppSelectProps) => (
	<Select value={value} onValueChange={onValueChange} disabled={disabled}>
		<SelectTrigger className={cn("w-full", className)} {...trigger}>
			<SelectValue placeholder={placeholder} />
		</SelectTrigger>
		<SelectContent>
			{/* SelectGroup carries the item padding (p-1) — without it the
			    items sit flush against the popover edges (shadcn docs pattern). */}
			<SelectGroup>{children}</SelectGroup>
		</SelectContent>
	</Select>
);
