import { useLocationState } from "@location-state/core";
import { useCallback, useMemo } from "react";
import { usePrefectures } from "../api";

export function usePrefecturesSelector() {
  const { data: prefectures } = usePrefectures();

  const [selectedPrefectureCodes, _setSelectedPrefectureCodes] =
    useLocationState<number[]>({
      name: "prefectures",
      defaultValue: [],
      storeName: "url",
    });

  const setSelectedPrefectureCodes = useCallback(
    (prefCodes: number[]) => {
      _setSelectedPrefectureCodes(
        prefCodes.filter((prefCode) =>
          prefectures.some((pref) => pref.prefCode === prefCode),
        ),
      );
    },
    [prefectures, _setSelectedPrefectureCodes],
  );

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
