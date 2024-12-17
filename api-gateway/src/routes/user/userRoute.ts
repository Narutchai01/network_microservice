import { Elysia } from "elysia";
import { LoginController } from "../../controller/user/login";

const router = new Elysia().group("/user", (app) =>
  app.post(
    "/login",
    async (
      { body }: { body: { email: string; password: string } },
      { cookie }: { cookie: { token: string } }
    ) => {
      const res = await LoginController(body);

      



      return {
        message: "sus",
      };
    }
  )
);

export default router;
