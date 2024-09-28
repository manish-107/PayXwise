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
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

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
        // Fetch accounts in parallel to reduce waiting time
        const [fromAcc, toAcc] = await Promise.all([
          prisma.account.findUnique({
            where: { acc_no: body.fromAccNo },
          }),
          prisma.account.findUnique({
            where: { acc_no: body.toAccNo },
          }),
        ]);

        if (!fromAcc || !toAcc) {
          return c.json({ message: "Account not found" }, 404);
        }

        // Convert balances to Decimal.js instances
        const fromBalance = new Decimal(fromAcc.balance);
        const toBalance = new Decimal(toAcc.balance);
        const amount = new Decimal(body.amount);

        // Check if the "from" account has enough balance
        if (fromBalance.lessThan(amount)) {
          return c.json({ message: "Insufficient balance" }, 400);
        }

        // Compute new balances outside of the database operations
        const fromNewBalance = fromBalance.minus(amount).toFixed();
        const toNewBalance = toBalance.plus(amount).toFixed();

        // Update balances in parallel to reduce transaction time
        const [updateFromAcc, updateToAcc] = await Promise.all([
          prisma.account.update({
            where: { acc_no: body.fromAccNo },
            data: { balance: fromNewBalance },
          }),
          prisma.account.update({
            where: { acc_no: body.toAccNo },
            data: { balance: toNewBalance },
          }),
        ]);

        // Create expense records in parallel
        const [addExpanseSender, addExpanseReceiver] = await Promise.all([
          prisma.expanses.create({
            data: {
              expcat_no: body.expcat_no,
              user_id: userId,
              amount: body.amount,
              expanseType: "debit",
            },
          }),
          prisma.expanses.create({
            data: {
              expcat_no: body.expcat_no,
              user_id: toAcc.user_id,
              amount: body.amount,
              expanseType: "credit",
            },
          }),
        ]);

        // Generate transaction details and store them
        const transcID = await generateUniqueTransactionId();
        const addTransactionDetails = await prisma.transactionDetails.create({
          data: {
            trans_id: transcID,
            from_id: userId,
            to_id: toAcc.user_id,
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
  }
});

transactionRoute.get("/search/:query", async (c) => {
  const searchParams = c.req.param("query");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const searchUser = await prisma.user.findMany({
      where: {
        fullName: {
          contains: searchParams,
          mode: "insensitive",
        },
      },
      select: {
        user_id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        accounts: {
          select: {
            acc_no: true,
            bankName: true,
            balance: true,
            created_date: true,
            updated_date: true,
          },
        },
      },
    });

    return c.json({
      user: searchUser,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: error }, 500);
  }
});

transactionRoute.get("/userSearch/:user_id", async (c) => {
  const userId = c.req.param("user_id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Query for a user by user_id
    const user = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        accounts: {
          select: {
            acc_no: true,
            bankName: true,
            balance: true,
            created_date: true,
            updated_date: true,
          },
        },
        transactionDetailsTo: {
          select: {
            trans_id: true,
            amount: true,
            description: true,
            trans_date: true,
            trans_type: true,
            status: true,
          },
        },
        transactionDetailsFrom: {
          select: {
            trans_id: true,
            amount: true,
            description: true,
            trans_date: true,
            trans_type: true,
            status: true,
            to_user: {
              select: {
                user_id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: error }, 500);
  }
});

transactionRoute.get("/accountDetails", async (c) => {
  const userId = c.get("userId"); // Retrieve the userId from the request context
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Fetch user details based on userId
    const userDetails = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        user_id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
      },
    });

    // Fetch the account details for the current user
    const accountDetails = await prisma.account.findMany({
      where: {
        user_id: userId,
      },
      select: {
        acc_no: true,
        bankName: true,
        balance: true,
        created_date: true,
        updated_date: true,
      },
    });

    // If no user or account details are found, return a 404 response
    if (!userDetails || accountDetails.length === 0) {
      return c.json({ message: "User or account details not found" }, 404);
    }

    // Return user details and account information
    return c.json({
      userDetails,
      accountDetails,
    });
  } catch (error) {
    console.error("Error fetching account details:", error);
    return c.json({ error: "Failed to fetch account details" }, 500);
  }
});

transactionRoute.get("/transactionDetails/:trans_id", async (c) => {
  const transId = c.req.param("trans_id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Fetch the transaction details using the provided transaction ID
    const transaction = await prisma.transactionDetails.findUnique({
      where: {
        trans_id: transId,
      },
      include: {
        from_user: {
          select: {
            user_id: true,
            fullName: true,
            email: true,
            accounts: {
              select: {
                acc_no: true,
                bankName: true,
                balance: true,
              },
            },
          },
        },
        to_user: {
          select: {
            user_id: true,
            fullName: true,
            email: true,
            accounts: {
              select: {
                acc_no: true,
                bankName: true,
                balance: true,
              },
            },
          },
        },
      },
    });

    // If the transaction is not found, return a 404 response
    if (!transaction) {
      return c.json({ error: "Transaction not found" }, 404);
    }

    // Return the transaction details along with user and bank information
    return c.json({
      transactionId: transaction.trans_id,
      amount: transaction.amount,
      description: transaction.description,
      fromUser: {
        userId: transaction.from_user.user_id,
        fullName: transaction.from_user.fullName,
        email: transaction.from_user.email,
        accounts: transaction.from_user.accounts,
      },
      toUser: {
        userId: transaction.to_user.user_id,
        fullName: transaction.to_user.fullName,
        email: transaction.to_user.email,
        accounts: transaction.to_user.accounts,
      },
      status: transaction.status,
      transDate: transaction.trans_date,
    });
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    return c.json({ error: "Failed to fetch transaction details." }, 500);
  }
});

transactionRoute.get("/transactionHistory", async (c) => {
  // const userId: string = c.req.param("userId");
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // Only fetch necessary fields to minimize data transfer and optimize performance
    const fetchUserData = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });

    const fetchAccounts = await prisma.account.findMany({
      where: {
        user_id: userId,
      },
    });
    const transacHistory = await prisma.transactionDetails.findMany({
      where: {
        from_id: userId,
      },
      orderBy: {
        trans_date: "desc", // Order by transaction date in descending order
      },
      take: 5, // Get the last 5 transactions
      select: {
        trans_id: true,
        amount: true,
        trans_date: true,
        status: true,
      },
    });

    return c.json({
      userData: fetchUserData,
      accountDetails: fetchAccounts,
      transactions: transacHistory,
    });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Failed to fetch transaction history." }, 500);
  }
});
