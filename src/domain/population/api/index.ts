import { HttpError, client } from "@/libs/api";
import { useQueries } from "@tanstack/react-query";
import type { GetApiV1PopulationCompositionPerYearParams } from "api/gen/models";
import { zip } from "es-toolkit";

export async function getPopulation({
  prefCode,
}: GetApiV1PopulationCompositionPerYearParams) {
  const resp = await client.population.$get({ query: { prefCode } });
  if (resp.ok) {
    return await resp.json();
  }
  throw new HttpError(resp);
}

export function usePopulations(prefCodes: number[]) {
  return useQueries({
    queries: prefCodes.map((prefCode) => {
      return {
        queryKey: ["population", prefCode],
        queryFn: () => getPopulation({ prefCode: String(prefCode) }),
      };
    }),
    combine: (results) => {
      return {
        data: zip(prefCodes, results)
          .map(([prefCode, result]) =>
            result.data !== undefined
              ? {
                  prefCode,
                  data: result.data,
                }
              : undefined,
          )
          .filter((result) => result !== undefined),
        error: results.map((result) => result.error),
        isFetching: results.some((result) => result.isFetching),
        isPending:
          results.length > 0 && results.every((result) => result.isPending),
      };
    },
  });
}
