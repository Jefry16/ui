import { formatMoney } from "../../lib/money";
import { useUiLabels } from "../../providers/labels";
import { AppStaticTable, type AppStaticTableColumn } from "./AppStaticTable";

export interface AudiencePriced {
	audienceId: string;
	audienceName: string;
	price: number;
}

export interface AppAudiencePriceTableProps<Row extends AudiencePriced> {
	rows: Row[];
	currency: string | null;
	columns?: AppStaticTableColumn<Row>[];
}

export const AppAudiencePriceTable = <Row extends AudiencePriced>({
	rows,
	currency,
	columns = [],
}: AppAudiencePriceTableProps<Row>) => {
	const labels = useUiLabels();
	return (
		<AppStaticTable
			columns={[
				{
					id: "audience",
					header: labels.audience,
					cell: (row) => row.audienceName,
				},
				{
					id: "price",
					header: labels.price,
					cell: (row) => formatMoney(row.price, currency, labels.locale),
					numeric: true,
				},
				...columns,
			]}
			rows={rows}
			rowKey={(row) => row.audienceId}
		/>
	);
};
