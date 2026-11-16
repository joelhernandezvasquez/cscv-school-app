import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next-auth/jwt", () => ({ getToken: vi.fn() }));
vi.mock("@/auth.config", () => ({ authConfig: {} }));
vi.mock("../auth/refreshToken", () => ({ refreshToken: vi.fn() }));

import * as actions from "..";

import { updateEnrollment } from "./updateEnrollment";

const fetchMock = vi.fn();

describe("updateEnrollment", () => {
  beforeEach(() => {
    vi.spyOn(actions, "getValidatedToken").mockResolvedValue("token-123");
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({
      json: async () => ({ success: true, message: "ok" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it.each(["3f2b8c1e-5d4a-4b7e-9a10-2c6f8e1d7b90", "42", "abc_DEF-123"])(
    "sends a PUT to /enrollments/%s with the bearer token and status",
    async (id) => {
      const result = await updateEnrollment(id, "enrolled");

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toBe(`http://localhost:4000/api/enrollments/${id}`);
      expect(options.method).toBe("PUT");
      expect(options.headers.Authorization).toBe("Bearer token-123");
      expect(options.body).toBe(JSON.stringify({ status: "enrolled" }));
      expect(result).toEqual({ success: true, message: "ok" });
    },
  );

  it.each(["1/../../admin", "1?x=1", "", "a b", "a#b", "a%2Fb"])(
    "rejects the unsafe id %j without calling fetch",
    async (id) => {
      await expect(updateEnrollment(id, "enrolled")).rejects.toThrow(
        "Invalid id",
      );
      expect(fetchMock).not.toHaveBeenCalled();
    },
  );
});
