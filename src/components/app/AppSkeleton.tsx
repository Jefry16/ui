import { Skeleton } from "../ui/skeleton";

export type AppSkeletonVariant = "control" | "image" | "list";

export interface AppSkeletonProps {
	variant: AppSkeletonVariant;
	rows?: number;
}

export const AppSkeleton = ({ variant, rows = 3 }: AppSkeletonProps) => {
	if (variant === "control") return <Skeleton className="h-9 w-full" />;
	if (variant === "image") return <Skeleton className="size-full" />;
	return (
		<div className="flex flex-col gap-4">
			{Array.from({ length: rows }, (_, row) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: a placeholder row has no identity but its position
				<div key={row} className="flex flex-col gap-1.5">
					<Skeleton className="h-4 w-2/3 max-w-md" />
					<Skeleton className="h-3.5 w-1/2 max-w-sm" />
				</div>
			))}
		</div>
	);
};
