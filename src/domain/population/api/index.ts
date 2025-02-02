import { HttpError, client } from "@/libs/api";
import type { GetApiV1PopulationCompositionPerYearParams } from "api/gen/models";

export async function getPopulation({
  prefCode,
}: GetApiV1PopulationCompositionPerYearParams) {
  const resp = await client.population.$get({ query: { prefCode } });
  if (resp.ok) {
    return await resp.json();
  }
  throw new HttpError(resp);
}
