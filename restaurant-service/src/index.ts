import { Elysia } from "elysia";
import { Menu } from "./models/menu";
import mongoose from "mongoose";

const app = new Elysia();
const PORT = process.env.PORT || 3000;
const MONGO_URI = String(process.env.MONGOURI);

app.get("/", () => "restraurant service");

app.post(
  "/addmenu",
  async ({ body }: { body: { name: string; price: number } }) => {
    const { name, price } = body;

    const menu = await Menu.create({ name, price });

    return {
      message: "Menu added successfully",
      menu,
    };
  }
);

app.get("/getmenu", async () => {
  const menus = await Menu.find();
  return menus;
});


app.get("/getmenu/:id", async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const menu = await Menu.findById(id);
  return {
    menu,
  };
});

app.listen(PORT, async () => {
  await mongoose.connect(MONGO_URI);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
});
