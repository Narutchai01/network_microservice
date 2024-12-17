import { Elysia } from "elysia";
import userRoute from "./routes/user/userRoute";
import orderRoute from "./routes/order/orderRoute";
import { jwt } from "@elysiajs/jwt";
import { cookie } from "@elysiajs/cookie";
import restrauntRoute from "./routes/restraunt/restraunt";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "love punch very much",
    })
  )
  .use(cookie());

app.get("/", () => "Hello Elysia");



app.use(userRoute);
app.use(orderRoute);
app.use(restrauntRoute);

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
