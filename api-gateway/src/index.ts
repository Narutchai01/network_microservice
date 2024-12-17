import { Elysia } from "elysia";
import userRoute from "./routes/user/userRoute";
import orderRoute from "./routes/order/orderRoute";

const app = new Elysia();


app.get("/", () => "Hello Elysia");


app.use(userRoute);
app.use(orderRoute);

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
