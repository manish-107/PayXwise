import { Hono } from "hono";
import { verify } from "hono/jwt";
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

transactionRoute.post("/sentMoney", async (c) => {
  try {
    const body = await c.req.json();
  } catch (error) {}
});
