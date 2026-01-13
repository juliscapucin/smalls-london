import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

test("renders name", async () => {
  const { getByText } = await render(<HelloWorld name="Vitest" />);
  expect(getByText("Hello Vitest!")).toBeInTheDocument();
});
