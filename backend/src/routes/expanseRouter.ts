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

    const expanseNameExists = await prisma.expanseCategory.findUnique({
      where: {
        expcat_name: body.categoryName,
      },
    });

    if (expanseNameExists) {
      return c.json({ message: "expanseName alreadt exists" });
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

expanseRouter.get("/getExpanseCategorys", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const getExpanseCategory = await prisma.expanseCategory.findMany({});
    return c.json({ ExpanseCategory: getExpanseCategory });
  } catch (error) {
    return c.json({ error: error });
  }
});

expanseRouter.put("/editExpanseCategory", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const findExpanseCategory = await prisma.expanseCategory.findUnique({
      where: {
        expcat_name: body.expcat_name,
      },
    });

    if (!findExpanseCategory) {
      return c.json({
        error: "Expanse category doesnt exists",
      });
    }

    const editExpanseCategory = await prisma.expanseCategory.update({
      where: { expcat_no: findExpanseCategory.expcat_no },
      data: {
        expcat_name: body.toeditexpcat_name,
      },
    });

    return c.json({ message: editExpanseCategory });
  } catch (error) {
    return c.json({ error: error });
  }
});
