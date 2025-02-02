import { handlers as populationHandlers } from "@/domain/population/mocks/handlers";
import { handlers as prefectureHandlers } from "@/domain/prefecture/mocks/handlers";

export const handlers = [...populationHandlers, ...prefectureHandlers];
