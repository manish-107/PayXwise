import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  cors({
    origin: "*", // Allow all origins
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

app.route("/api/v1/users", userRouter);

export default app;
