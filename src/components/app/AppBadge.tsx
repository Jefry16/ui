import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

type BadgeProps = ComponentProps<typeof Badge>;

const stateVariants = {
	destructive:
		"bg-destructive/8 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/8 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/15",
	success:
		"bg-success/8 text-success focus-visible:ring-success/20 dark:bg-success/8 dark:focus-visible:ring-success/40 [a]:hover:bg-success/15",
	warning:
		"bg-warning/8 text-warning focus-visible:ring-warning/20 dark:bg-warning/8 dark:focus-visible:ring-warning/40 [a]:hover:bg-warning/15",
	info: "bg-info/8 text-info focus-visible:ring-info/20 dark:bg-info/8 dark:focus-visible:ring-info/40 [a]:hover:bg-info/15",
} as const;

type StateVariant = keyof typeof stateVariants;

export type AppBadgeProps = Omit<BadgeProps, "variant"> & {
	variant?: NonNullable<BadgeProps["variant"]> | StateVariant;
};

const isState = (variant: AppBadgeProps["variant"]): variant is StateVariant =>
	variant !== undefined && variant in stateVariants;

export const AppBadge = ({
	className,
	variant = "default",
	...props
}: AppBadgeProps) => (
	<Badge
		variant={isState(variant) ? "destructive" : variant}
		className={cn(
			"rounded-lg",
			isState(variant) && stateVariants[variant],
			className,
		)}
		{...props}
	/>
);
