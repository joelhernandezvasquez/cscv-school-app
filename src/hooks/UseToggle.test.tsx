import { act, renderHook } from "@testing-library/react";
import UseToggle from "./UseToggle";

describe("UseToggle", () => {
  it("starts untoggled", () => {
    const { result } = renderHook(() => UseToggle());

    expect(result.current.isToggle).toBe(false);
  });

  it("flips the state each time handleToggle is called", () => {
    const { result } = renderHook(() => UseToggle());

    act(() => result.current.handleToggle());
    expect(result.current.isToggle).toBe(true);

    act(() => result.current.handleToggle());
    expect(result.current.isToggle).toBe(false);
  });
});
