import { describe, expect, it } from "vitest";
import { formatMoney } from "./money";

describe("formatMoney", () => {
	it("applies the currency", () => {
		const eur = formatMoney(95, "EUR", "en");

		expect(eur).toMatch(/95/);
		expect(eur).not.toBe("95.00");
	});

	it("uses the currency's own decimal count, not a fixed two", () => {
		expect(formatMoney(1234, "JPY", "en")).not.toMatch(/[.,]00/);
		expect(formatMoney(1234, "EUR", "en")).toMatch(/00/);
	});

	it("falls back to a plain two-decimal number when the currency is unknown", () => {
		expect(formatMoney(95, null, "en")).toBe("95.00");
		expect(formatMoney(95.5, null, "en")).toBe("95.50");
	});

	it("rounds to the currency's precision rather than truncating", () => {
		expect(formatMoney(95.005, null, "en")).toBe("95.01");
	});

	it("formats zero rather than treating it as absent", () => {
		expect(formatMoney(0, null, "en")).toBe("0.00");
		expect(formatMoney(0, "EUR", "en")).toMatch(/0/);
	});

	it("keeps a negative signed", () => {
		expect(formatMoney(-95, null, "en")).toMatch(/^-/);
	});

	it("formats in the given locale, not the runtime default", () => {
		expect(formatMoney(1234.5, null, "es")).toBe(
			new Intl.NumberFormat("es", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			}).format(1234.5),
		);
		expect(formatMoney(1234.5, null, "es")).not.toBe(
			formatMoney(1234.5, null, "en"),
		);
	});
});
