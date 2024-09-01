import { Hono, Context } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Function) => {
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
};
