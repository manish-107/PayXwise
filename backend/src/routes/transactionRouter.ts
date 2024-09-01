import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import Decimal from "decimal.js";
import z from "zod";
import { authMiddleware } from "../middleware/auth";
import { generatecharid } from "../middleware/generateUniqueId";

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

transactionRoute.post("/sentMoney", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  // Input validation for the body
  const schema = z.object({
    fromAccNo: z.string(),
    toAccNo: z.string(),
    amount: z.number().positive(), // Ensure the amount is positive
    expcat_no: z.number().int(), // Ensure expcat_no is an integer
    description: z.string().optional(), // Add description as optional
  });

  const parseResult = schema.safeParse(body);
  if (!parseResult.success) {
    return c.json({ error: "Invalid request data" }, 400);
  }

  try {
    const generateUniqueTransactionId = async (): Promise<string> => {
      let isUnique = false;
      let transID = "";

      while (!isUnique) {
        transID = generatecharid();
        const existingTransaction = await prisma.transactionDetails.findUnique({
          where: { trans_id: transID },
        });

        if (!existingTransaction) {
          isUnique = true;
        }
      }

      return transID;
    };

    const sendMoneyResult = await prisma.$transaction(
      async (prisma) => {
        // Find the "from" account
        const findFromAcc = await prisma.account.findUnique({
          where: { acc_no: body.fromAccNo },
        });

        if (!findFromAcc) {
          return c.json({ message: "From account not found" }, 404);
        }

        // Find the "to" account
        const findToAcc = await prisma.account.findUnique({
          where: { acc_no: body.toAccNo },
        });

        if (!findToAcc) {
          return c.json({ message: "To account not found" }, 404);
        }

        // Convert balances to Decimal.js instances
        const fromBalance = new Decimal(findFromAcc.balance);
        const toBalance = new Decimal(findToAcc.balance);
        const amount = new Decimal(body.amount);

        // Check if the "from" account has enough balance
        if (fromBalance.lessThan(amount)) {
          return c.json({ message: "Insufficient balance" }, 400);
        }

        // Update balances
        const fromNewBalance = fromBalance.minus(amount).toFixed();
        const toNewBalance = toBalance.plus(amount).toFixed();

        // Update the "from" account with the new balance
        const updateFromAcc = await prisma.account.update({
          where: { acc_no: body.fromAccNo },
          data: { balance: fromNewBalance },
        });

        // Update the "to" account with the new balance
        const updateToAcc = await prisma.account.update({
          where: { acc_no: body.toAccNo },
          data: { balance: toNewBalance },
        });

        // Add a debit record for the sender
        const addExpanseSender = await prisma.expanses.create({
          data: {
            expcat_no: body.expcat_no,
            user_id: userId,
            amount: body.amount,
            expanseType: "debit",
          },
        });

        // Add a credit record for the receiver
        const addExpanseReceiver = await prisma.expanses.create({
          data: {
            expcat_no: body.expcat_no,
            user_id: findToAcc.user_id,
            amount: body.amount,
            expanseType: "credit",
          },
        });

        // Generate and store the transaction details
        const transcID = await generateUniqueTransactionId();
        const addTransactionDetails = await prisma.transactionDetails.create({
          data: {
            trans_id: transcID,
            from_id: userId,
            to_id: findToAcc.user_id,
            amount: body.amount,
            description: body.description ?? "N/A",
            trans_type: "credit",
            status: "success",
          },
        });

        return {
          updateFromAcc,
          updateToAcc,
          addExpanseSender,
          addExpanseReceiver,
          addTransactionDetails,
        };
      },
      { timeout: 10000 } // Set timeout to 10 seconds (increase if needed)
    );

    return c.json({ success: true, data: sendMoneyResult });
  } catch (error) {
    console.error("Transaction Error:", error);
    return c.json({ error: "Transaction failed" }, 500);
  } finally {
    await prisma.$disconnect();
  }
});
