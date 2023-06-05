import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getPlan: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.plan.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  editPlan: protectedProcedure
    .input(
      z.object({
        budget: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.plan.upsert({
        create: {
          budget: input.budget,
          userId: ctx.session.user.id,
        },
        update: {
          budget: input.budget,
        },
        where: {
          userId: ctx.session.user.id,
        },
      });
    }),
  getExpenses: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.expenses.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  addExpense: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        cost: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.expenses.create({
        data: {
          name: input.name,
          cost: input.cost,
          userId: ctx.session.user.id,
        },
      });
    }),

  deleteExpense: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.expenses.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
