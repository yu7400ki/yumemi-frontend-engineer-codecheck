import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { z } from "zod";
import type { GetApiV1PopulationCompositionPerYearParams } from "./gen/models";
import { getApiV1PopulationCompositionPerYear } from "./gen/人口構成/人口構成";
import { getApiV1Prefectures } from "./gen/都道府県一覧/都道府県一覧";
import type { Env } from "./types";

const populationQuerySchema = z.object({
  prefCode: z.string(),
});

const resas = new Hono<Env>()
  .get("/prefectures", async (c) => {
    const { data, status } = await getApiV1Prefectures();
    const prefectures = data.result;
    if (status === 200) {
      return c.json(prefectures);
    }
    return c.json(data as unknown as string, status as ContentfulStatusCode);
  })
  .get("/population", zValidator("query", populationQuerySchema), async (c) => {
    const query = c.req.valid(
      "query",
    ) satisfies GetApiV1PopulationCompositionPerYearParams;
    const { data, status } = await getApiV1PopulationCompositionPerYear(query);
    const population = data.result;
    if (status === 200) {
      return c.json(population);
    }
    return c.json(data as unknown as string, status as ContentfulStatusCode);
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
