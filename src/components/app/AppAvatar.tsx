import type { ComponentProps } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export interface AppAvatarProps {
	name: string;
	src?: string | null;
	size?: ComponentProps<typeof Avatar>["size"];
}

export const AppAvatar = ({ name, src, size }: AppAvatarProps) => (
	<Avatar size={size} className="rounded-lg after:rounded-lg">
		{src && <AvatarImage src={src} alt={name} className="rounded-lg" />}
		<AvatarFallback className="rounded-lg">
			{name.charAt(0).toUpperCase()}
		</AvatarFallback>
	</Avatar>
);
