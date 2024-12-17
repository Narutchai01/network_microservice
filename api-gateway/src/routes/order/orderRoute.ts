import { Elysia } from "elysia";


const router = new Elysia().group("/order",(app)=>app.get("/",()=> "Hello Order").get("/profile",()=> "Order Profile"));



export default router;