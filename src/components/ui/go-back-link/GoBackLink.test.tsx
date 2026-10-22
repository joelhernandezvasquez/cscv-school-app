import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GoBackLink from "./GoBackLink";

// Vite cannot load the repo's postcss.config.mjs (string plugin list), so CSS Modules are stubbed.
vi.mock("./style.module.css", () => ({ default: {} }));

const back = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back }),
}));

describe("GoBackLink", () => {
  it("renders a Go Back button", () => {
    render(<GoBackLink />);

    expect(screen.getByRole("button", { name: "Go Back" })).toBeInTheDocument();
  });

  it("navigates back in history when clicked", async () => {
    const user = userEvent.setup();
    render(<GoBackLink />);

    await user.click(screen.getByRole("button", { name: "Go Back" }));

    expect(back).toHaveBeenCalledTimes(1);
  });

  it("does not navigate until clicked", () => {
    render(<GoBackLink />);

    expect(back).not.toHaveBeenCalled();
  });
});
