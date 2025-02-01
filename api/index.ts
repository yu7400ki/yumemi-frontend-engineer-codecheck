import { Hono } from "hono";
import type { Env } from "./types";

const app = new Hono<Env>().basePath("/api");

app
  .get("/", (c) => c.text("Hello, World!"))
  .notFound((c) => c.env.ASSETS.fetch(c.req.raw));

export default app;
export type AppType = typeof app;
