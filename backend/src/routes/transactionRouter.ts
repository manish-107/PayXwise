import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import Decimal from "decimal.js";
import z from "zod";
import { authMiddleware } from "../middleware/auth";

export const transactionRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

transactionRoute.use("/*", authMiddleware);

//touser fromuser amount description expansename

//account table -amount +amount
//expanseTable

transactionRoute.post("/sentMoney", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const sendMoneyResult = await prisma.$transaction(async (prisma) => {
      // Find the "from" account
      const findFromAcc = await prisma.account.findUnique({
        where: {
          acc_no: body.fromAccNo,
        },
      });

      if (!findFromAcc) {
        return c.json({ message: "From account not found" });
      }

      // Find the "to" account
      const findToAcc = await prisma.account.findUnique({
        where: {
          acc_no: body.toAccNo,
        },
      });

      if (!findToAcc) {
        return c.json({ message: "To account not found" });
      }

      // Check if the "from" account has enough balance
      if (new Decimal(findFromAcc.balance).lessThan(body.amount)) {
        return c.json({ message: "Insufficient balance" });
      }

      // Calculate the new balances using Decimal methods
      const fromNewBalance = new Decimal(findFromAcc.balance).minus(
        body.amount
      ); // Deduct from "from" account
      const toNewBalance = new Decimal(findToAcc.balance).plus(body.amount); // Add to "to" account

      // Update the "from" account with the new balance
      const updateFromAcc = await prisma.account.update({
        where: {
          acc_no: body.fromAccNo,
        },
        data: {
          balance: fromNewBalance,
        },
      });

      // Update the "to" account with the new balance
      const updateToAcc = await prisma.account.update({
        where: {
          acc_no: body.toAccNo,
        },
        data: {
          balance: toNewBalance,
        },
      });

      return { updateFromAcc, updateToAcc };
    });
  } catch (error) {}
});
