import { useLocationState } from "@location-state/core";
import { Suspense } from "react";
import { css } from "styled-system/css";
import { PopulationChart } from "../population-chart";

const POPULATION_TYPE = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

export function PrefecturePopulation() {
  const [populationType, setPopulationType] = useLocationState<string>({
    name: "populationType",
    defaultValue: POPULATION_TYPE[0],
    storeName: "url",
  });

  return (
    <div
      className={css({
        display: "grid",
      })}
    >
      <select
        value={populationType}
        onChange={(e) => setPopulationType(e.target.value)}
        className={css({
          padding: 2,
          borderRadius: 2,
          border: "1px solid #ccc",
          marginBottom: 2,
          width: "100%",
          maxWidth: "xs",
          placeSelf: "end",
        })}
      >
        {POPULATION_TYPE.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <div
        className={css({
          aspectRatio: "16 / 9",
          display: "grid",
          placeItems: "center",
          overflowX: "auto",
          overflowY: "hidden",
          maxWidth: "100%",
          minHeight: "calc(token(sizes.3xl) * 9 / 16)",
        })}
      >
        <Suspense fallback={<div>グラフをロード中...</div>}>
          <div
            className={css({
              width: "100%",
              minWidth: "3xl",
              aspectRatio: "16 / 9",
            })}
          >
            <PopulationChart populationType={populationType} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
