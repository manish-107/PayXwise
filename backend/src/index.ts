import { Hono } from "hono";
import { userRouter } from "./routes/userRouter";
import { cors } from "hono/cors";
import { expanseRouter } from "./routes/expanseRouter";
import { transactionRoute } from "./routes/transactionRouter";

export const app = new Hono();

app.use(
  cors({
    origin: "*", // Allow all origins
    allowMethods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

app.route("/api/v1/users", userRouter);
app.route("/api/v1/expanse", expanseRouter);
app.route("/api/v1/transaction", transactionRoute);

export default app;
