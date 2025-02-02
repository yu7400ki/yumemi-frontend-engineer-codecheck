import { client } from "@/libs/api";
import { http, HttpResponse } from "msw";
import { seedPopulation } from "./data";

export const handlers = [
  http.get(client.population.$url().toString(), () => {
    return HttpResponse.json(seedPopulation());
  }),
];
