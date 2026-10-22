import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

// Vite cannot load the repo's postcss.config.mjs (string plugin list), so CSS Modules are stubbed.
vi.mock("./style.module.css", () => ({ default: {} }));

describe("ErrorMessage", () => {
  it("renders the message it receives", () => {
    render(<ErrorMessage message="First Name is required." />);

    expect(screen.getByText("First Name is required.")).toBeInTheDocument();
  });

  it("renders the message as a paragraph", () => {
    render(<ErrorMessage message="Level is required." />);

    expect(screen.getByText("Level is required.").tagName).toBe("P");
  });
});
