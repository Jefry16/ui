export const formatMoney = (
	amount: number,
	currency: string | null,
	locale: string,
): string =>
	new Intl.NumberFormat(
		locale,
		currency
			? { style: "currency", currency }
			: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
	).format(amount);
