import { renderHook } from "@testing-library/react-hooks";

import useStopwatch from "../index";

describe("useStopwatch", () => {
  it("starts at zero", () => {
    const { result } = renderHook(() => useStopwatch());
    expect(result.current).toBe("0s");
  });
});
