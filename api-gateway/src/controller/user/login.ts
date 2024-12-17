import { authService } from "../../lib/axios";
import { Elysia } from "elysia";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const LoginController = async (body: LoginRequestBody) => {
    const { data } = await authService.post("/login", body);
    return data;
};