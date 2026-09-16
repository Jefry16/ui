export type PathRow = Record<string, unknown>;

export const readPath = (row: PathRow, path: string): unknown =>
	path
		.split(".")
		.reduce<unknown>(
			(acc, key) =>
				acc && typeof acc === "object"
					? (acc as Record<string, unknown>)[key]
					: undefined,
			row,
		);
