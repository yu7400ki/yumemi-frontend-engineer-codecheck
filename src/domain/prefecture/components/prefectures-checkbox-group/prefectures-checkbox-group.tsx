import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { useCallback } from "react";
import { css } from "styled-system/css";
import { usePrefectures } from "../../api";
import { usePrefecturesSelector } from "../../hooks/use-prefectures-selector";

export function PrefecturesCheckboxGroup() {
  const { data: prefectures } = usePrefectures();
  const { selectedPrefectureCodes, setSelectedPrefectureCodes } =
    usePrefecturesSelector();

  const handleChange = useCallback(
    (prefCode: string[]) => {
      setSelectedPrefectureCodes(prefCode.map(Number));
    },
    [setSelectedPrefectureCodes],
  );

  return (
    <fieldset
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        rowGap: 1,
      })}
    >
      <legend
        className={css({
          mb: 1,
          fontSize: "xl",
          fontWeight: "bold",
        })}
      >
        都道府県
      </legend>
      <CheckboxGroup
        value={selectedPrefectureCodes.map(String)}
        onChange={handleChange}
      >
        {prefectures?.map((prefecture) => (
          <div key={prefecture.prefCode} className={css({ w: "fit-content" })}>
            <Checkbox name="prefectures" value={String(prefecture.prefCode)}>
              {prefecture.prefName}
            </Checkbox>
          </div>
        ))}
      </CheckboxGroup>
    </fieldset>
  );
}
