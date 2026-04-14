import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./src/mocks/node";

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();

  return {
    ...actual,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    }),
    usePathname: vi.fn(),
    useParams: vi.fn(),
    notFound: vi.fn(),
  };
});

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: ResizeObserverMock,
});

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
  vi.resetAllMocks();
});

// Clean up after all tests
afterAll(() => server.close());
