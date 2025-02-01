import { getContext } from "hono/context-storage";
import type { Env } from "./types";

function getBody<T>(c: Response | Request): Promise<T> {
  const contentType = c.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return c.json();
  }

  return c.text() as Promise<T>;
}

function getHeaders(headers?: HeadersInit): HeadersInit {
  const ctx = getContext<Env>();
  const apiKey = ctx.env.RESAS_API_KEY;

  return {
    ...headers,
    "X-API-KEY": apiKey,
  };
}

export async function resasFetch<T>(
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1],
): Promise<T> {
  const requestHeaders = getHeaders(init?.headers);

  const requestInit: RequestInit = {
    ...init,
    headers: requestHeaders,
  };

  const request = new Request(input, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
}
