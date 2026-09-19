import { CalendarDays } from "lucide-react";
import { type ComponentProps, useState } from "react";
import { cn } from "../../lib/utils";
import { useUiLabels } from "../../providers/labels";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface AppDatePickerProps {
	id?: string;
	value: string;
	onValueChange: (value: string) => void;
	onBlur?: () => void;
	placeholder?: string;
	disabledDates?: ComponentProps<typeof Calendar>["disabled"];
	"aria-invalid"?: boolean;
	"aria-required"?: boolean;
}

const parseIso = (value: string): Date | undefined => {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!match) return undefined;
	return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
};

const toIso = (date: Date): string =>
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const AppDatePicker = ({
	id,
	value,
	onValueChange,
	onBlur,
	placeholder,
	disabledDates,
	"aria-invalid": ariaInvalid,
	"aria-required": ariaRequired,
}: AppDatePickerProps) => {
	const labels = useUiLabels();
	const [open, setOpen] = useState(false);

	const date = parseIso(value);
	const display = date
		? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date)
		: null;

	return (
		<Popover
			open={open}
			onOpenChange={(next) => {
				setOpen(next);
				if (!next) onBlur?.();
			}}
		>
			<PopoverTrigger asChild>
				<Button
					type="button"
					variant="outline"
					id={id}
					className={cn(
						"w-full cursor-pointer justify-start bg-card text-left font-normal",
						!display && "text-muted-foreground",
					)}
					aria-invalid={ariaInvalid}
					aria-required={ariaRequired}
				>
					<CalendarDays />
					{display ?? placeholder ?? labels.pickADate}
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align="start"
				aria-label={labels.pickADate}
			>
				<Calendar
					mode="single"
					selected={date}
					defaultMonth={date}
					disabled={disabledDates}
					onSelect={(d) => {
						onValueChange(d ? toIso(d) : "");
						setOpen(false);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
};
