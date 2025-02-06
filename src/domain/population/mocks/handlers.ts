import { client } from "@/libs/api";
import { populationQuerySchema } from "api/schemas";
import { zip } from "es-toolkit";
import { http, HttpResponse } from "msw";
import { seedPopulation } from "./data";

export const handlers = [
  http.get(client.population.$url().toString(), ({ request }) => {
    const prefCodeParam = new URL(request.url).searchParams.getAll("prefCodes");
    const { data, error } = populationQuerySchema.safeParse({
      prefCodes: prefCodeParam,
    });

    if (error) {
      return HttpResponse.json(error, {
        status: 400,
      });
    }

    const { prefCodes } = data;

    const populations = prefCodes.map((prefCode) =>
      seedPopulation(Number(prefCode)),
    );
    return HttpResponse.json(
      zip(prefCodes, populations).map(([prefCode, data]) => ({
        prefCode: Number(prefCode),
        data,
      })),
    );
  }),
];
