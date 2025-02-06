import { HttpError, client } from "@/libs/api";
import { useQueries } from "@tanstack/react-query";
import type { GetApiV1PopulationCompositionPerYearParams } from "api/gen/models";

export async function getPopulation({
  prefCode,
}: GetApiV1PopulationCompositionPerYearParams) {
  const resp = await client.population.$get({
    query: { prefCodes: [prefCode] },
  });
  if (resp.ok) {
    const data = await resp.json();
    return data[0];
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
        data: results
          .map((result) =>
            result.data !== undefined
              ? {
                  prefCode: result.data.prefCode,
                  data: result.data.data,
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
