import type { ComponentProps } from "react";
import { Textarea } from "../ui/textarea";

export type AppTextareaProps = Omit<
	ComponentProps<typeof Textarea>,
	"value" | "onChange"
> & {
	value: string;
	onValueChange: (value: string) => void;
};

export const AppTextarea = ({
	rows = 3,
	onValueChange,
	...props
}: AppTextareaProps) => (
	<Textarea
		rows={rows}
		onChange={(e) => onValueChange(e.target.value)}
		{...props}
	/>
);
