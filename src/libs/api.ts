import type { AppType } from "api";
import { hc } from "hono/client";

export const client = hc<AppType>(`${window.location.origin}/api`);

export class HttpError extends Error {
  status: number;

  constructor(response: Response) {
    super(response.statusText);
    this.status = response.status;
    this.name = "HttpError";
  }
}
