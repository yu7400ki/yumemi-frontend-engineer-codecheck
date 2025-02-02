import { HttpError, client } from "@/libs/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export async function getPrefectures() {
  const resp = await client.prefectures.$get();
  if (resp.ok) {
    return await resp.json();
  }
  throw new HttpError(resp);
}

export function usePrefectures() {
  return useSuspenseQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
  });
}
