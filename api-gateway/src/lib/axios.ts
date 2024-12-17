import axios from "axios";

const AuthService = process.env.AUTH_SERVICE_URL || "http://localhost:3001";

export const authService = axios.create({
  baseURL: AuthService,
});