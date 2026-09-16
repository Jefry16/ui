import type { AnyFieldApi } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { AppDatePicker } from "./AppDatePicker";
import { RequiredMark } from "./RequiredMark";

interface AppDateFieldProps {
	field: AnyFieldApi;
	label: string;
	description?: string;
	placeholder?: string;
	required?: boolean;
	disabledDates?: ComponentProps<typeof AppDatePicker>["disabledDates"];
}

export const AppDateField = ({
	field,
	label,
	description,
	placeholder,
	required,
	disabledDates,
}: AppDateFieldProps) => {
	const isInvalid =
		field.state.meta.isTouched && field.state.meta.errors.length > 0;

	return (
		<Field data-invalid={isInvalid || undefined}>
			<FieldLabel htmlFor={field.name}>
				{label}
				{required && <RequiredMark />}
			</FieldLabel>
			<AppDatePicker
				id={field.name}
				value={field.state.value as string}
				onValueChange={field.handleChange}
				onBlur={field.handleBlur}
				placeholder={placeholder}
				disabledDates={disabledDates}
				aria-invalid={isInvalid}
				aria-required={required || undefined}
			/>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};
