import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from "zod";

export const expanseRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const parseExpanseCategory = z.object({
  categoryName: z.string(),
});

expanseRouter.use("/*", authMiddleware);

expanseRouter.post("/addExpanseCategory", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const parsedBody = parseExpanseCategory.safeParse(body);

    if (!parsedBody.success) {
      return c.json({ message: "give categoryName" });
    }

    const expanseCategory = await prisma.expanseCategory.create({
      data: {
        expcat_name: body.categoryName,
      },
    });

    console.log("[Expanse] :" + expanseCategory);

    return c.json({
      message: "expanseCategory created",
    });
  } catch (error) {
    return c.json({ error: error });
  }
});
