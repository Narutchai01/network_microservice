import { fetch } from "bun";
import { Elysia } from "elysia";
import mongoose from "mongoose";
import { Axiosinstance } from "./lib/axios";
import { Orderv2 } from "./interface/interface";
import { OrderS } from "./models/Order";

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = String(process.env.MONGOURI);

interface Order {
  menu_id: string;
  quantity: number;
}

interface OrderRequest {
  orders: Order[];
}

const app = new Elysia();

app.get("/", () => "order service");

app.post(
  "/order/:id",
  async ({ body, params }: { body: OrderRequest; params: { id: string } }) => {
    const { id } = params;
    const { orders } = body;


    const order = await Promise.all(orders.map(async (order) => {
      const { menu_id, quantity } = order;
      const orderPrice = await Axiosinstance.get(`/getmenu/${menu_id}`).then((res: { data: { menu: any; }; }) => res.data.menu);
      return {
        quantity,
        menu_name: orderPrice.name,
        price: orderPrice.price * quantity,
      };
    }));

    const totalPrice = order.reduce((acc, cur) => acc + cur.price, 0);


    const newOrder = await OrderS.create({
      user_id: id,
      order,
      totalPrice,
    });

    await newOrder.save();
    

    return {
      message: "Order created",
      order: newOrder,
    };
  }
);

app.listen(PORT, async () => {
  await mongoose.connect(MONGO_URI);
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
});
