import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: vi.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

class NoopIntersectionObserver implements IntersectionObserver {
	readonly root = null;
	readonly rootMargin = "";
	readonly thresholds: readonly number[] = [];
	disconnect() {}
	observe() {}
	unobserve() {}
	takeRecords(): IntersectionObserverEntry[] {
		return [];
	}
}
vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);

class NoopResizeObserver implements ResizeObserver {
	disconnect() {}
	observe() {}
	unobserve() {}
}
vi.stubGlobal("ResizeObserver", NoopResizeObserver);

Element.prototype.hasPointerCapture ??= () => false;
Element.prototype.setPointerCapture ??= () => undefined;
Element.prototype.releasePointerCapture ??= () => undefined;
Element.prototype.scrollIntoView ??= () => undefined;

afterEach(() => {
	cleanup();
});
