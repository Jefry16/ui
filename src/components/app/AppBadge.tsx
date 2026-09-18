import type { ComponentProps } from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

export type AppBadgeProps = ComponentProps<typeof Badge>;

export const AppBadge = ({ className, ...props }: AppBadgeProps) => (
	<Badge className={cn("rounded-lg", className)} {...props} />
);
