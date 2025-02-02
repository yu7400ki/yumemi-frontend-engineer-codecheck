import { client } from "@/libs/api";
import { http, HttpResponse } from "msw";
import { seedPopulation } from "./data";

export const handlers = [
  http.get(client.population.$url().toString(), ({ request }) => {
    const prefCodeParam = new URL(request.url).searchParams.get("prefCode");

    if (!prefCodeParam) {
      return HttpResponse.text("Bad Request", {
        status: 400,
      });
    }

    const prefCode = Number(prefCodeParam);
    if (Number.isNaN(prefCode)) {
      return HttpResponse.text("Bad Request", {
        status: 400,
      });
    }

    if (prefCode < 1 || prefCode > 47) {
      return HttpResponse.text("Not Found", {
        status: 404,
      });
    }

    return HttpResponse.json(seedPopulation(prefCode));
  }),
];
