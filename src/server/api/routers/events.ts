import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import type { Event } from "@prisma/client";

const addUserDataToEvents = async (events: Event[]) => {
  const userId = events.map((event) => event.authorId);
  const users = (
    await clerkClient.users.getUserList({
      userId: userId,
      limit: 110,
    })
  ).map(filterUserForClient);

  return events.map((event) => {
    const author = users.find((user) => user.id === event.authorId);

    if (!author) {
      console.error("AUTHOR NOT FOUND", event);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Author for event not found. event ID: ${event.id}, USER ID: ${event.authorId}`,
      });
    }
    if (!author.username) {
      // user the ExternalUsername
      if (!author.externalUsername) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Author has no GitHub Account: ${author.id}`,
        });
      }
      author.username = author.externalUsername;
    }
    return {
      event,
      author: {
        ...author,
        username: author.username ?? "(username not found)",
      },
    };
  });
};

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(2, "2 s"),
  analytics: true,
});

enum Catagory {
  CORPERATE = "CORPERATE",
  SOCIAL = "SOCIAL",
  TECHNICAL = "TECHNICAL",
  OTHER = "OTHER",
}

export const eventsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
      });

      if (!event) throw new TRPCError({ code: "NOT_FOUND" });

      return (await addUserDataToEvents([event]))[0];
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      take: 100,
      orderBy: [{ date: "asc" }],
    });

    return addUserDataToEvents(events);
  }),

  getAllPublished: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany({
      where: {
        published: true,
      },
      take: 100,
      orderBy: { date: "asc" },
    });

    return addUserDataToEvents(events);
  }),

  getEventsByCatagory: publicProcedure
    .input(
      z.object({
        catagory: z.string(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.event
        .findMany({
          where: {
            catagory: input.catagory as Catagory,
          },
          take: 100,
          orderBy: [{ createdAt: "desc" }],
        })
        .then(addUserDataToEvents)
    ),

  create: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        description: z.string().min(1).max(255),
        code: z.string().optional(),
        links: z.array(z.string().url()).optional(),
        catagory: z.string().optional(),
        images: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        attendees: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const event = await ctx.prisma.event.create({
        data: {
          authorId,
          name: input.name,
          description: input.description,
          code: input.code ? input.code : "",
          links: input.links ? input.links : ([] as string[]),
          tags: input.tags ? input.tags : [],
          catagory: input.catagory
            ? (input.catagory as Catagory)
            : Catagory.OTHER,
          images: input.images ? input.images : [],
          attendees: input.attendees ? input.attendees : [],
        },
      });

      return event;
    }),

  editEventsByEventId: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(255),
        description: z.string().min(1).max(255),
        date: z.date().optional(),
        code: z.string().optional(),
        links: z.array(z.string().url()).optional(),
        catagory: z.string().optional(),
        images: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        attendees: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      // check each link in links
      const isValidLink = (link: string): boolean => {
        const regex =
          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
        return regex.test(link);
      };
      const areAllLinksValid = (links: string[]) => {
        return links.every((link) => isValidLink(link));
      };
      if (
        input.links?.length &&
        input.links?.length > 0 &&
        !areAllLinksValid(input.links)
      ) {
        throw new TRPCError({ code: "CONFLICT" });
      }

      const { success } = await ratelimit.limit(authorId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      const event = await ctx.prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          code: input.code ? input.code : "",
          links: input.links ? input.links : ([] as string[]),
          tags: input.tags ? input.tags : [],
          catagory: input.catagory
            ? (input.catagory as Catagory)
            : Catagory.OTHER,
          images: input.images ? input.images : [],
          attendees: input.attendees ? input.attendees : [],
        },
      });

      return event;
    }),

  deleteEventsByEventId: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
      });

      if (!event) throw new TRPCError({ code: "NOT_FOUND" });

      if (event.authorId !== ctx.userId) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.prisma.event.delete({
        where: {
          id: input.id,
        },
      });

      return event;
    }),
});
