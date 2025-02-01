import { Hono } from "hono";

type Bindings = {
  ASSETS: Fetcher;
};

type Env = {
  Bindings: Bindings;
};

const app = new Hono<Env>().basePath("/api");

app
  .get("/", (c) => c.text("Hello, World!"))
  .notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
export type AppType = typeof app;
