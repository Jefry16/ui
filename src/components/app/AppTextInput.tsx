import type { ComponentProps } from "react";
import { Input } from "../ui/input";

export type AppTextInputProps = Omit<
	ComponentProps<typeof Input>,
	"value" | "onChange"
> & {
	value: string;
	onValueChange: (value: string) => void;
};

export const AppTextInput = ({
	onValueChange,
	...props
}: AppTextInputProps) => (
	<Input onChange={(e) => onValueChange(e.target.value)} {...props} />
);
