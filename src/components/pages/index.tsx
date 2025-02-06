import { lazy } from "react";
import { css } from "styled-system/css";

const PrefecturePopulation = lazy(() =>
  import("@/domain/population/components/prefecture-population").then(
    (module) => ({ default: module.PrefecturePopulation }),
  ),
);

const PrefecturesCheckboxGroup = lazy(() =>
  import("@/domain/prefecture/components/prefectures-checkbox-group").then(
    (module) => ({ default: module.PrefecturesCheckboxGroup }),
  ),
);

export function Page() {
  return (
    <div>
      <header
        className={css({
          py: 3,
          bg: "gray.100",
        })}
      >
        <h1
          className={css({
            textAlign: "center",
            fontSize: "2xl",
            fontWeight: "bold",
          })}
        >
          都道府県別総人口推移グラフ
        </h1>
      </header>
      <main
        className={css({
          display: "grid",
          gap: 8,
          maxW: "4xl",
          mx: "auto",
          px: 2,
          py: 8,
          sm: {
            px: 4,
          },
        })}
      >
        <PrefecturesCheckboxGroup />
        <PrefecturePopulation />
      </main>
    </div>
  );
}
