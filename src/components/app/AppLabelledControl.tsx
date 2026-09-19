import type { ReactNode } from "react";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "../ui/field";
import { RequiredMark } from "./RequiredMark";

export type AppLabelledControlLayout = "stack" | "row";

export interface AppLabelledControlProps {
	label: string;
	htmlFor?: string;
	hint?: string;
	code?: string;
	required?: boolean;
	description?: string;
	invalid?: boolean;
	errors?: Array<{ message?: string } | undefined>;
	layout?: AppLabelledControlLayout;
	hideLabel?: boolean;
	children: ReactNode;
}

const Caption = ({
	label,
	hint,
	code,
	required,
}: Pick<AppLabelledControlProps, "label" | "hint" | "code" | "required">) => (
	<>
		{label}
		{required && <RequiredMark />}
		{hint && (
			<span className="text-xs font-normal text-muted-foreground">{hint}</span>
		)}
		{code && (
			<span className="font-mono text-xs font-normal text-muted-foreground">
				{code}
			</span>
		)}
	</>
);

export const AppLabelledControl = ({
	label,
	htmlFor,
	hint,
	code,
	required,
	description,
	invalid,
	errors,
	layout = "stack",
	hideLabel,
	children,
}: AppLabelledControlProps) => {
	const caption = (
		<Caption label={label} hint={hint} code={code} required={required} />
	);
	const footer = (
		<>
			{description && <FieldDescription>{description}</FieldDescription>}
			{invalid && <FieldError errors={errors} />}
		</>
	);
	if (!htmlFor) {
		return (
			<FieldSet className="gap-3" data-invalid={invalid || undefined}>
				<FieldLegend
					variant="label"
					className={hideLabel ? "sr-only" : "flex gap-2"}
				>
					{caption}
				</FieldLegend>
				{children}
				{footer}
			</FieldSet>
		);
	}
	return (
		<Field
			orientation={layout === "row" ? "horizontal" : "vertical"}
			data-invalid={invalid || undefined}
		>
			<FieldLabel
				htmlFor={htmlFor}
				className={hideLabel ? "sr-only" : undefined}
			>
				{caption}
			</FieldLabel>
			{children}
			{footer}
		</Field>
	);
};
