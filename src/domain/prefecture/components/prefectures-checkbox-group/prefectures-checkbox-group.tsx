import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Skelton } from "@/components/ui/skelton";
import { Suspense, useCallback } from "react";
import { css } from "styled-system/css";
import { usePrefectures } from "../../api";
import { usePrefecturesSelector } from "../../hooks/use-prefectures-selector";

export function PrefecturesCheckboxGroup() {
  return (
    <fieldset>
      <legend
        className={css({
          mb: 1,
          fontSize: "xl",
          fontWeight: "bold",
        })}
      >
        都道府県
      </legend>
      <CheckboxListContainer>
        <Suspense fallback={<LoadingPrefectures />}>
          <PrefecturesCheckboxList />
        </Suspense>
      </CheckboxListContainer>
    </fieldset>
  );
}

function CheckboxListContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        rowGap: 1,
      })}
    >
      {children}
    </div>
  );
}

function PrefecturesCheckboxList() {
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
  );
}

function LoadingPrefectures() {
  return (
    <>
      {Array.from({ length: 47 }).map((_, index) => (
        <Skelton
          // biome-ignore lint/suspicious/noArrayIndexKey: static array
          key={index}
          className={css({
            w: 20,
            h: 6,
          })}
        />
      ))}
    </>
  );
}
