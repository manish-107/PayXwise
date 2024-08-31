import { Hono } from "hono";
import { verify } from "hono/jwt";

export const transactionRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

transactionRoute.use("/*", async (c, next) => {
  try {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(" ")[1];
    const payload: any = await verify(token, c.env.JWT_SECRET);

    if (!payload) {
      c.status(401);
      return c.json({ Error: "unauthorized" });
    }

    c.set("userId", payload.id);
    await next();
  } catch (error) {
    return c.json({ error: error });
  }
});

transactionRoute.post("/sentMoney", async (c) => {
  try {
  } catch (error) {}
});
