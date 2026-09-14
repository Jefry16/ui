import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppError } from "../components/app/AppError";
import { testLabels } from "../test/labels";
import { UiLabelsProvider } from "./labels";

describe("UiLabelsProvider", () => {
	it("a shared component refuses to render without one, rather than guessing a sentence", () => {
		expect(() => render(<AppError description="x" />)).toThrow(
			/UiLabelsProvider/,
		);
	});

	it("a shared component reads the sentence the provider gives it", () => {
		render(
			<UiLabelsProvider labels={{ ...testLabels, retry: "Once more" }}>
				<AppError description="x" onRetry={() => undefined} />
			</UiLabelsProvider>,
		);
		expect(screen.getByRole("button", { name: "Once more" })).toBeVisible();
	});
});
