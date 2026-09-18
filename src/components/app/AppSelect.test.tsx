import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { SelectItem } from "../ui/select";
import { AppSelect } from "./AppSelect";

const mount = (value: string) => {
	const onValueChange = vi.fn();
	const view = renderWithProviders(
		<AppSelect
			aria-label="Currency"
			value={value}
			onValueChange={onValueChange}
			placeholder="Select a currency"
		>
			<SelectItem value="eur">Euro</SelectItem>
			<SelectItem value="usd">US Dollar</SelectItem>
		</AppSelect>,
	);
	return {
		...view,
		onValueChange,
		trigger: screen.getByRole("combobox", { name: "Currency" }),
	};
};

describe("AppSelect", () => {
	it("hands a picked option's value over", async () => {
		const { onValueChange, trigger } = mount("");
		const user = userEvent.setup();

		await user.click(trigger);
		await user.click(await screen.findByRole("option", { name: "US Dollar" }));

		expect(onValueChange).toHaveBeenCalledWith("usd");
	});

	it("reads the picked option, and the placeholder once cleared", () => {
		const { rerender, trigger } = mount("usd");
		expect(trigger).toHaveTextContent("US Dollar");

		rerender(
			<AppSelect
				aria-label="Currency"
				value=""
				onValueChange={() => {}}
				placeholder="Select a currency"
			>
				<SelectItem value="eur">Euro</SelectItem>
				<SelectItem value="usd">US Dollar</SelectItem>
			</AppSelect>,
		);

		expect(trigger).toHaveTextContent("Select a currency");
	});
});
