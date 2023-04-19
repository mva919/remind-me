import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const courseRouter = createTRPCRouter({
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
    .input(
      z.object({
        name: z.string().min(1).max(200),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      console.log("userId", userId);

      const course = await ctx.prisma.course.create({
        data: {
          userId,
          name: input.name,
        },
      });

      return course;
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
