import type { ComponentProps } from "react";
import { Badge } from "../ui/badge";

export type AppBadgeProps = ComponentProps<typeof Badge>;

export const AppBadge = (props: AppBadgeProps) => <Badge {...props} />;
