import { Elysia } from "elysia";
import { restraurantService } from "../../lib/axios";

interface IRestraunt {
  body: {
    name: string;
    price: number;
  };
}

const router = new Elysia().group("/restraunt", (app) =>
  app
    .get("/", async () => {
      const { data } = await restraurantService.get("/getmenu");
      return data;
    })
    .get("/:id", async ({ params }: { params: { id: string } }) => {
      const { id } = params;
      const { data } = await restraurantService.get(`/getmenu/${id}`);
      return data;
    })
    .post("/", async ({ body }: IRestraunt) => {
      const { name, price } = body;
      const { data } = await restraurantService.post("/addmenu", {
        name: name,
        price: price,
      });
      if (!data) {
        return {
          message: "Restraunt not found",
        };
      }

      return {
        message: "Restraunt created",
      };
    })
);

export default router;
