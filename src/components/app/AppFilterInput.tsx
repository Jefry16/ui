import type { ComponentProps } from "react";
import { Input } from "../ui/input";

export function AppFilterInput(props: ComponentProps<typeof Input>) {
	return <Input className="h-8" {...props} />;
}
