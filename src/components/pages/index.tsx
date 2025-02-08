import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { css } from "styled-system/css";
import { ErrorComponent } from "./index.error";

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
    <div
      className={css({
        display: "grid",
        gridTemplateRows: "auto 1fr",
        minHeight: "100dvh",
      })}
    >
      <header
        className={css({
          py: 3,
          bg: "bg.emphasis",
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
          width: "100%",
          maxW: "4xl",
          mx: "auto",
          px: 2,
          py: 8,
          sm: {
            px: 4,
          },
        })}
      >
        <ErrorBoundary fallback={<ErrorComponent />}>
          <PrefecturesCheckboxGroup />
          <PrefecturePopulation />
        </ErrorBoundary>
      </main>
    </div>
  );
}
