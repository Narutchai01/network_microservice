import { Elysia } from "elysia";
import { authService } from "../../lib/axios";

interface Ilogin {
  body: {
    email: string;
    password: string;
  };
  cookie: {
    token: any;
  };
}

interface Iregister {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

const router = new Elysia().group("/user", (app) =>
  app
    .post("/login", async ({ body, cookie: { token } }: Ilogin) => {
      const { email, password } = body;

      const { data } = await authService.post("/login", {
        email,
        password,
      });

      token.set({
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        value: data.user,
      });

      return {
        message: "Login success",
      };
    })
    .post("/register", async ({ body }: Iregister) => {
      const { email, password, name } = body;

      const { data } = await authService.post("/register", {
        email,
        password,
        name,
      });

      return {
        message: "Register success",
      };
    })
    .get(
      "/getuser",
      async ({ cookie: { token } }: { cookie: { token: { value: any } } }) => {
        const { data } = await authService.get(`/users/${token.value}`);

        return {
          message: "Get user success",
          data,
        };

        // const { data } = await authService.get("/users/");
      }
    )
);

export default router;
