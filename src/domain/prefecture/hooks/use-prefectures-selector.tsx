import { useLocationState } from "@location-state/core";
import { useMemo } from "react";
import { usePrefectures } from "../api";

export function usePrefecturesSelector() {
  const { data: prefectures } = usePrefectures();

  const [selectedPrefectureCodes, setSelectedPrefectureCodes] =
    useLocationState<number[]>({
      name: "prefectures",
      defaultValue: [],
      storeName: "url",
    });

  const selectedPrefectures = useMemo(
    () =>
      prefectures.filter((pref) =>
        selectedPrefectureCodes.includes(pref.prefCode),
      ),
    [prefectures, selectedPrefectureCodes],
  );

  return {
    selectedPrefectures,
    selectedPrefectureCodes,
    setSelectedPrefectureCodes,
  };
}
