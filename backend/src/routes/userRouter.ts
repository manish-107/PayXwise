import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import z from "zod";
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
});

userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const parseResult = signupInput.safeParse(body);

    if (!parseResult.success) {
      return c.json(
        { error: "Invalid input", details: parseResult.error.errors },
        400
      );
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
        gender: body.gender,
        securityA: body.securityA,
        securityQ: body.securityQ,
      },
    });

    console.log(createUser);

    return c.json({ msg: createUser });
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/getUser", async (c) => {
  return c.json({ msg: "hello" });
});
