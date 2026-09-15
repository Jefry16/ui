import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { clientFrom } from "../test/data";
import { wrapperWithProviders } from "../test/test-utils";
import { useResource } from "./use-resource";

describe("useResource", () => {
	it("asks the client for the url and hands back the body", async () => {
		const asked: string[] = [];
		const client = clientFrom(async <R,>(url: string) => {
			asked.push(url);
			return { id: "m-1", title: "Main menu" } as R;
		});

		const { result } = renderHook(
			() =>
				useResource<{ id: string; title: string }>(
					["menus", "op-1", "m-1"],
					"/tour-operators/op-1/menus/m-1",
				),
			{ wrapper: wrapperWithProviders({ client }).Wrapper },
		);

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(result.current.data).toEqual({ id: "m-1", title: "Main menu" });
		expect(asked).toEqual(["/tour-operators/op-1/menus/m-1"]);
	});

	it("surfaces a refusal as an error rather than empty data", async () => {
		const client = clientFrom(async () => {
			throw new Error("Menu not found");
		});

		const { result } = renderHook(
			() =>
				useResource(
					["menus", "op-1", "gone"],
					"/tour-operators/op-1/menus/gone",
				),
			{ wrapper: wrapperWithProviders({ client }).Wrapper },
		);

		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(result.current.data).toBeUndefined();
	});
});
