import { z } from "zod";

export const prefCodeSchema = z.coerce.number().int().min(1).max(47);

export const populationQuerySchema = z.object({
  prefCodes: z
    .array(prefCodeSchema)
    .or(prefCodeSchema)
    .transform((v) => Array.from(new Set([v].flat()))),
});
