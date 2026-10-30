import { render, screen } from "@testing-library/react";
import CourseLevelPill from "./CourseLevelPill";

// Vite cannot load the repo's postcss.config.mjs (string plugin list), so CSS Modules are stubbed.
vi.mock("./style.module.css", () => ({ default: {} }));

describe("CourseLevelPill", () => {
  it.each([
    ["level1", "Nivel 1"],
    ["level2", "Nivel 2"],
    ["level3", "Nivel 3"],
    ["ongoing", "Active"],
    ["upcoming", "Upcoming"],
    ["completed", "Completed"],
    ["cancelled", "Cancel"],
  ])("shows the label for the %s level slug", (level, label) => {
    render(<CourseLevelPill level={level} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("shows Renacer for the renacer slug produced by formatCourseLevel", () => {
    render(<CourseLevelPill level="renacer" />);

    expect(screen.getByText("Renacer")).toBeInTheDocument();
  });

  it("shows an unknown level unchanged", () => {
    render(<CourseLevelPill level="advanced" />);

    expect(screen.getByText("advanced")).toBeInTheDocument();
  });
});
