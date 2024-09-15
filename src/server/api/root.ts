import { createTRPCRouter } from "~/server/api/trpc";
import { courseRouter } from "~/server/api/routers/course";
import { taskRouter } from "./routers/task";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
