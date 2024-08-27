import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { withAccelerate } from "@prisma/extension-accelerate";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

const signupInput = z.object({
  email: z.string().email(),
  fullName: z.string(),
  phoneNumber: z.string(),
  password: z.string().min(6),
  gender: z.enum(["male", "female"]),
  securityQuestion: z.enum(["1", "2", "3"]),
  securityAnswer: z.string(),
  bankName: z.string(),
});

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const parseResult = signupInput.safeParse(body);

    if (!parseResult.success) {
      return c.json(
        { error: "Invalid input", details: parseResult.error.errors },
        400
      );
    }

    const generatecharid = (): string => {
      const uuid = uuidv4().replace(/-/g, "");
      console.log(uuid);
      const elevenCharId: string = uuid.substring(0, 15);
      return elevenCharId;
    };

    const generateUniqueAccoutId = async (): Promise<string> => {
      let isUnique: Boolean = false;
      let accountId: string = "";

      while (!isUnique) {
        accountId = generatecharid();

        const existingAccount = await prisma.account.findUnique({
          where: { acc_no: accountId },
        });

        if (!existingAccount) {
          isUnique = true;
        }
      }

      return accountId;
    };

    const accId = await generateUniqueAccoutId();

    const result = await prisma.$transaction(async (prisma) => {
      const createUser = await prisma.user.create({
        data: {
          fullName: body.fullName,
          email: body.email,
          phoneNumber: body.phoneNumber,
          password: body.password,
          gender: body.gender,
          securityQ: body.securityQuestion,
          securityA: body.securityAnswer,
        },
        select: { user_id: true },
      });

      const createAccount = await prisma.account.create({
        data: {
          acc_no: accId,
          user_id: createUser.user_id,
          bankName: body.bankName,
          balance: 500,
        },
      });

      return { createUser, createAccount };
    });

    return c.json({ msg: result });
  } catch (error) {
    console.log(error);
  }
});

// userRouter.get("/getUser", async (c) => {
//   const body = c.req.json();
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   try {
//     const createUser = await prisma.user.create({
//       data: {
//         fullName: body.fullName,
//         email: body.email,
//         phoneNumber: body.phoneNumber,
//         password: body.password,
//         gender: body.gender,
//         securityA: body.securityA,
//         securityQ: body.securityQ,
//       },
//       select: { user_id: true },
//     });
//   } catch (error) {}
//   return c.json({ msg: "hello" });
// });
