import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../test/test-utils";
import { Toaster } from "../ui/sonner";
import { useAppToast } from "./use-app-toast";

const Screen = () => {
	const toast = useAppToast();
	return (
		<>
			<Toaster />
			<button type="button" onClick={() => toast.created("Experience")}>
				create
			</button>
			<button type="button" onClick={() => toast.deleted("Page")}>
				delete
			</button>
			<button type="button" onClick={() => toast.error("Couldn't save")}>
				fail
			</button>
		</>
	);
};

describe("useAppToast", () => {
	it("says what happened to which resource, in the sentences it was handed", async () => {
		const user = userEvent.setup();
		renderWithProviders(<Screen />);

		await user.click(screen.getByRole("button", { name: "create" }));
		expect(await screen.findByText("Experience created")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "delete" }));
		expect(await screen.findByText("Page deleted")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "fail" }));
		expect(await screen.findByText("Couldn't save")).toBeInTheDocument();
	});
});
