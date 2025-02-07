import { HttpError, client } from "@/libs/api";
import { useQueries } from "@tanstack/react-query";
import Dataloader from "dataloader";
import { zip } from "es-toolkit";

async function populationLoaderFn(prefCodes: readonly number[]) {
  const resp = await client.population.$get({
    query: { prefCodes: prefCodes.map(String) },
  });
  if (resp.ok) {
    const data = await resp.json();
    const populationsMap = new Map<number, (typeof data)[number]>();
    for (const population of data) {
      populationsMap.set(population.prefCode, population);
    }
    return prefCodes.map((prefCode) => populationsMap.get(prefCode));
  }
  throw new HttpError(resp);
}

const populationLoader = new Dataloader(populationLoaderFn, {
  cache: false,
});

export async function getPopulation(prefCode: number) {
  const data = await populationLoader.load(prefCode);
  if (data) {
    return data;
  }
  throw new Error("Failed to fetch population data");
}

export function usePopulations(prefCodes: number[]) {
  return useQueries({
    queries: prefCodes.map((prefCode) => {
      return {
        queryKey: ["population", prefCode],
        queryFn: () => getPopulation(prefCode),
      };
    }),
    combine: (results) => {
      return {
        data: results
          .map((result) =>
            result.data !== undefined ? result.data : undefined,
          )
          .filter((result) => result !== undefined),
        error: zip(prefCodes, results)
          .map(([prefCode, result]) =>
            result.error ? { prefCode, error: result.error } : undefined,
          )
          .filter((result) => result !== undefined),
        isFetching: results.some((result) => result.isFetching),
        isPending:
          results.length > 0 && results.every((result) => result.isPending),
      };
    },
  });
}
