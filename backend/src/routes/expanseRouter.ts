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
  Variables: {
    userId: string;
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

expanseRouter.get("/getExpanseCategoryofuser", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Get all expense categories with the sum of amounts spent by the user
    const expanseSummary = await prisma.expanseCategory.findMany({
      where: {
        expanses: {
          some: {
            user_id: userId,
          },
        },
      },
      select: {
        expcat_no: true,
        expcat_name: true,
        expanses: {
          where: { user_id: userId },
          select: {
            amount: true,
          },
        },
      },
    });

    // Aggregate the sum of expenses for each category
    const result = expanseSummary.map((category) => {
      const totalAmount = category.expanses.reduce((sum, exp) => {
        // Convert Prisma Decimal to a number using `.toNumber()`
        return sum + exp.amount.toNumber();
      }, 0);

      return {
        id: category.expcat_no,
        expanseName: category.expcat_name,
        totalAmount: totalAmount,
      };
    });

    return c.json({ categories: result });
  } catch (error) {
    console.error(error);
    return c.json({ error: "Unable to get expanse categories for the user" });
  }
});
