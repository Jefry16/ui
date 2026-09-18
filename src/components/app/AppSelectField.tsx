import type { AnyFieldApi } from "@tanstack/react-form";
import type { ReactNode } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { AppSelect } from "./AppSelect";
import { RequiredMark } from "./RequiredMark";

interface AppSelectFieldProps {
	field: AnyFieldApi;
	label: string;
	children: ReactNode;
	placeholder?: string;
	description?: string;
	required?: boolean;
	hideLabel?: boolean;
	onValueChange?: (value: string) => void;
}

export const AppSelectField = ({
	field,
	label,
	children,
	placeholder,
	description,
	required,
	hideLabel,
	onValueChange,
}: AppSelectFieldProps) => {
	const isInvalid =
		field.state.meta.isTouched && field.state.meta.errors.length > 0;
	return (
		<Field data-invalid={isInvalid || undefined}>
			<FieldLabel
				htmlFor={field.name}
				className={hideLabel ? "sr-only" : undefined}
			>
				{label}
				{required && <RequiredMark />}
			</FieldLabel>
			<AppSelect
				id={field.name}
				value={field.state.value ?? ""}
				onValueChange={(v) => {
					field.handleChange(v);
					onValueChange?.(v);
				}}
				onBlur={field.handleBlur}
				aria-invalid={isInvalid}
				aria-required={required || undefined}
				placeholder={placeholder}
			>
				{children}
			</AppSelect>
			{description && <FieldDescription>{description}</FieldDescription>}
			{isInvalid && <FieldError errors={field.state.meta.errors} />}
		</Field>
	);
};
