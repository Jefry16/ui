import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

export type AppStaticTableEmphasis = "strong" | "muted";

export interface AppStaticTableColumn<Row> {
	id: string;
	header: string;
	cell: (row: Row) => ReactNode;
	numeric?: boolean;
	emphasis?: AppStaticTableEmphasis;
}

export interface AppStaticTableProps<Row> {
	columns: AppStaticTableColumn<Row>[];
	rows: Row[];
	rowKey: (row: Row, index: number) => string;
}

const EMPHASIS: Record<AppStaticTableEmphasis, string> = {
	strong: "font-medium",
	muted: "text-muted-foreground",
};

export const AppStaticTable = <Row,>({
	columns,
	rows,
	rowKey,
}: AppStaticTableProps<Row>) => (
	<Table>
		<TableHeader>
			<TableRow>
				{columns.map((column) => (
					<TableHead
						key={column.id}
						className={cn(column.numeric && "text-right")}
					>
						{column.header}
					</TableHead>
				))}
			</TableRow>
		</TableHeader>
		<TableBody>
			{rows.map((row, index) => (
				<TableRow key={rowKey(row, index)}>
					{columns.map((column) => (
						<TableCell
							key={column.id}
							className={cn(
								column.numeric && "text-right tabular-nums",
								column.emphasis && EMPHASIS[column.emphasis],
							)}
						>
							{column.cell(row)}
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	</Table>
);
