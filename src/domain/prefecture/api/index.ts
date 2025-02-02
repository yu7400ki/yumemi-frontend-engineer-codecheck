import { HttpError, client } from "@/libs/api";

export async function getPrefectures() {
  const resp = await client.prefectures.$get();
  if (resp.ok) {
    return await resp.json();
  }
  throw new HttpError(resp);
}
