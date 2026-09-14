import type { LinkLikeProps } from "../components/app/AppLinks";

export const anchorLink = ({ to, params, ...rest }: LinkLikeProps) => (
	<a
		href={to ?? "#"}
		data-params={params ? JSON.stringify(params) : undefined}
		{...rest}
	/>
);
