import { zValidator } from "@hono/zod-validator";
import { zip } from "es-toolkit";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import type {
  ContentfulStatusCode,
  SuccessStatusCode,
} from "hono/utils/http-status";
import { getApiV1PopulationCompositionPerYear } from "./gen/人口構成/人口構成";
import { getApiV1Prefectures } from "./gen/都道府県一覧/都道府県一覧";
import { populationQuerySchema } from "./schemas";
import type { Env } from "./types";

const resas = new Hono<Env>()
  .get("/prefectures", async (c) => {
    const { data, status } = await getApiV1Prefectures();
    const prefectures = data.result;
    if (status === 200) {
      return c.json(prefectures);
    }
    return c.json(
      data as unknown as string,
      status as Exclude<ContentfulStatusCode, SuccessStatusCode>,
    );
  })
  .get("/population", zValidator("query", populationQuerySchema), async (c) => {
    const { prefCodes } = c.req.valid("query");
    const result = await Promise.all(
      prefCodes.map((prefCode) =>
        getApiV1PopulationCompositionPerYear({ prefCode: String(prefCode) }),
      ),
    );
    const populations = zip(prefCodes, result)
      .map(([prefCode, { data, status }]) => ({
        prefCode,
        data: data.result,
        status,
      }))
      .filter((d) => d.status === 200);
    return c.json(populations);
  });

const app = new Hono<Env>()
  .basePath("/api")
  .use(contextStorage())
  .route("", resas);

app
  .get("/", (c) => c.text("Hello, World!"))
  .notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
export type AppType = typeof resas;
