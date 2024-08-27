import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { cors } from "hono/cors";

export const app = new Hono();

app.use(
  cors({
    origin: "*", // Allow all origins
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

app.route("/api/v1/users", userRouter);

export default app;
