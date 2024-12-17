import axios from "axios";

const AuthService = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const OrderService = process.env.ORDER_SERVICE_URL || "http://localhost:3003";
const RestraurantService =
  process.env.RESTRAURANT_SERVICE_URL || "http://localhost:3002";

export const authService = axios.create({
  baseURL: AuthService,
});

export const orderService = axios.create({
  baseURL: OrderService,
});

export const restraurantService = axios.create({
  baseURL: RestraurantService,
});
