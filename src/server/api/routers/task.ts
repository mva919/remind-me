import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TaskCreateFormSchema } from "~/lib/types";

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({
      where: {
        userId: {
          equals: ctx.userId,
        },
      },
    });
  }),
  create: protectedProcedure
    .input(TaskCreateFormSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const task = await ctx.prisma.task.create({
        data: {
          name: input.name,
          dueDate: input.dueDate,
          type: String(input.type),
          description: input.description,
          course: {
            connect: {
              id: input.course.id,
            },
          },
        },
      });

      return task;
    }),
  get: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const tasks = await ctx.prisma.task.findMany({
        where: {
          courseId: {
            in: input,
          },
        },
      });

      return tasks;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      console.log("userId", userId);

      const course = await ctx.prisma.course.delete({
        where: {
          id: input,
        },
      });

      return course;
    }),
});
