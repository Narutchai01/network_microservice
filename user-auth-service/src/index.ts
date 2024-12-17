import { Elysia } from "elysia";
import { User } from "../src/models/userModel";
import mongoose from "mongoose";

const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = String(process.env.MONGOURI);
const app = new Elysia();

app.get("/", () => "user service");

app.post(
  "/register",
  async ({
    body,
  }: {
    body: { name: string; email: string; password: string };
  }) => {
    const { name, email, password } = body;

    const user = new User({ name, email, password });

    await user.save();

    return { user };
  }
);


app.post("/login", async ({ body }: { body: { email: string; password: string } }) => {
  const { email, password } = body;

  const user = await User.findOne({ email, password });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return {
    user : user?._id,
  };
});


app.get("/users/:id", async ({params}) => {
  const { id } = params;

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return { user };

});

app.listen(PORT, async () => {
  await mongoose.connect(MONGO_URI);
  console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
  );
});
