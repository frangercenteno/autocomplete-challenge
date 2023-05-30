import { act, fireEvent, render, screen } from "@testing-library/react";

import App from "../App";
import USER_MOCK from "../mocks/users.mocks.json";
import { expect, it, vi } from "vitest";

beforeEach(() => {
  const mRes = { json: vi.fn().mockResolvedValueOnce(USER_MOCK) };
  const mockedFetch = vi.fn().mockResolvedValueOnce(mRes as any);
  (global as any).fetch = mockedFetch;
});

describe("App", () => {
  it("should render title", () => {
    render(<App />);

    // check if App components renders headline
    expect(screen.getByRole("heading")).toHaveTextContent(
      "This project is built with Vite and React"
    );
  });

  it("should handle autocomplete input and render all options filtered", async () => {
    await render(<App />);
    const input = await screen.getByRole("textbox");

    expect(input).toHaveValue("");

    // check if input has value

    await act(() => {
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: "Leanne" } });
    });
    expect(input).toHaveValue("Leanne");

    expect(
      screen.getByText("This project is built with Vite and React")
    ).toBeInTheDocument();
  });

  it("should handle autocomplete input and doesn't render any options", async () => {
    await render(<App />);
    const input = await screen.getByRole("textbox");

    expect(input).toHaveValue("");

    // check if input has value

    await act(() => {
      fireEvent.click(input);
      fireEvent.change(input, { target: { value: "Not exist" } });
    });
    expect(input).toHaveValue("Not exist");

    expect(screen.getByText("No data")).toBeInTheDocument();
  });
});
