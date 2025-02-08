import { RefreshCwIcon } from "lucide-react";
import { css } from "styled-system/css";
import { Button } from "../ui/button";

export function ErrorComponent() {
  return (
    <div
      className={css({
        display: "grid",
        placeContent: "center",
        placeItems: "center",
        gap: "4",
      })}
    >
      <p className={css({ fontSize: "lg" })}>
        ページの読み込み中にエラーが発生しました。
      </p>
      <Button onClick={() => window.location.reload()}>
        <RefreshCwIcon />
        再読み込み
      </Button>
    </div>
  );
}
