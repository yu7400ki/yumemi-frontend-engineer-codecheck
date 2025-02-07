import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useControllableValue } from "./use-controllable-value";

describe("useControllableValue", () => {
  describe("uncontrolled", () => {
    it("デフォルト値が返る", () => {
      const { result } = renderHook(() =>
        useControllableValue({ defaultValue: "default" }),
      );
      expect(result.current[0]).toBe("default");
    });

    it("デフォルト値が更新される", () => {
      const { result } = renderHook(() =>
        useControllableValue({ defaultValue: "default" }),
      );
      act(() => {
        result.current[1]("new");
      });
      expect(result.current[0]).toBe("new");
    });

    it("updaterから更新される", () => {
      const { result } = renderHook(() =>
        useControllableValue({ defaultValue: "default" }),
      );
      act(() => {
        result.current[1]((v) => `${v}-new`);
      });
      expect(result.current[0]).toBe("default-new");
    });

    it("onChangeコールバックが呼ばれる", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableValue({ defaultValue: "default", onChange }),
      );
      act(() => {
        result.current[1]("new");
      });
      expect(onChange).toHaveBeenCalledWith("new");
    });
  });

  describe("controlled", () => {
    it("コントロールされた値が返る", () => {
      const { result } = renderHook(() =>
        useControllableValue({ value: "controlled", defaultValue: "default" }),
      );
      expect(result.current[0]).toBe("controlled");
    });

    it("コントロールされた値は更新されない", () => {
      const { result } = renderHook(() =>
        useControllableValue({ value: "controlled", defaultValue: "default" }),
      );
      act(() => {
        result.current[1]("new");
      });
      expect(result.current[0]).toBe("controlled");
    });

    it("onChangeコールバックが呼ばれる", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableValue({
          value: "controlled",
          defaultValue: "default",
          onChange,
        }),
      );
      act(() => {
        result.current[1]("new");
      });
      expect(onChange).toHaveBeenCalledWith("new");
    });

    it("親からの値が更新される", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useControllableValue({ value, defaultValue: "default" }),
        { initialProps: { value: "controlled" } },
      );
      rerender({ value: "new" });
      expect(result.current[0]).toBe("new");
    });
  });
});
