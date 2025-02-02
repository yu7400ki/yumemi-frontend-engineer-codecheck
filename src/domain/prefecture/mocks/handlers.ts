import { client } from "@/libs/api";
import { http, HttpResponse } from "msw";
import { seedPrefectures } from "./data";

export const handlers = [
  http.get(client.prefectures.$url().toString(), () => {
    return HttpResponse.json(seedPrefectures());
  }),
];
