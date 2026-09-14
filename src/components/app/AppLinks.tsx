import { ArrowLeft, Plus } from "lucide-react";
import { type ComponentType, Fragment, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";

export interface LinkLikeProps {
	to?: string;
	params?: Record<string, unknown>;
	className?: string;
	children?: ReactNode;
	[prop: string]: unknown;
}

export interface Crumb {
	label: ReactNode;
	to?: string;
	params?: Record<string, unknown>;
}

// biome-ignore lint/suspicious/noExplicitAny: a router's Link is generic over its own route tree; this package renders whatever it is handed and the app narrows the result to its Link type in one place
type AnyLink = ComponentType<any>;

export function createAppLinks(RouterLink: AnyLink) {
	const AppLink = ({ className, ...rest }: LinkLikeProps) => (
		<RouterLink
			className={cn("transition-colors duration-150", className)}
			{...rest}
		/>
	);

	const AppBackLink = ({ children, ...rest }: LinkLikeProps) => (
		<AppLink
			className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
			{...rest}
		>
			<ArrowLeft className="size-4" />
			{children}
		</AppLink>
	);

	const AppNewLink = ({ children, ...rest }: LinkLikeProps) => (
		<Button asChild>
			<AppLink {...rest}>
				<Plus />
				{children}
			</AppLink>
		</Button>
	);

	const AppResourceLink = ({ className, ...rest }: LinkLikeProps) => (
		<AppLink
			className={cn(
				"text-info underline-offset-2 hover:text-info/80 hover:underline",
				className,
			)}
			{...rest}
		/>
	);

	const AppBreadcrumb = ({ items }: { items: Crumb[] }) => (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, i) => {
					const isLast = i === items.length - 1;
					const key = `${i}-${typeof item.label === "string" ? item.label : ""}`;
					return (
						<Fragment key={key}>
							<BreadcrumbItem>
								{isLast ? (
									<BreadcrumbPage>{item.label}</BreadcrumbPage>
								) : item.to ? (
									<BreadcrumbLink asChild>
										<AppLink to={item.to} params={item.params}>
											{item.label}
										</AppLink>
									</BreadcrumbLink>
								) : (
									<span>{item.label}</span>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);

	return { AppLink, AppBackLink, AppNewLink, AppResourceLink, AppBreadcrumb };
}
