import { Elysia } from "elysia";
import { orderService } from "../../lib/axios";
import { jwt } from "@elysiajs/jwt";

interface Order {
  menu_id: string;
  quantity: number;
}

interface Req {
  body: {
    orders: Order[];
  };
  cookie: {
    token: any;
    order: any;
  };
}

interface ResgetOrder {
  cookie: {
    token: any;
    order: any;
  };
}

const router = new Elysia().group("/order", (app) =>
  app
    .get("/", () => "Hello Order")
    .get("/getorder", ({ cookie: { token, order } }: ResgetOrder) => {
      const tokenValue = token.value;
      const orderValue = JSON.parse(order.value);
      return {
        message: "Get Order",
        orderValue,
      };
    })
    .post("/", async ({ body, cookie: { token, order } }: Req) => {
      const { orders } = body;
      const { data } = await orderService.post(`/order/${token.value}`, {
        orders: orders,
      });

      order.set({
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        value: data.order,
      });

      return {
        message: "Order created",
      };
    })
);

export default router;
