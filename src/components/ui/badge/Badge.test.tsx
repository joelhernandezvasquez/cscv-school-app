import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

// Vite cannot load the repo's postcss.config.mjs (string plugin list), so CSS Modules are stubbed.
vi.mock("./style.module.css", () => ({ default: {} }));

describe("Badge", () => {
  it.each(["Active", "Inactive"] as const)(
    "shows the %s status in both the mobile and desktop variants",
    (status) => {
      render(<Badge status={status} />);

      expect(screen.getAllByText(status)).toHaveLength(2);
    },
  );

  it("does not show the opposite status", () => {
    render(<Badge status="Active" />);

    expect(screen.queryByText("Inactive")).not.toBeInTheDocument();
  });
});
