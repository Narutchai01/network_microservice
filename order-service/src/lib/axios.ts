import axios from "axios";

const API_restaurant = String(process.env.restraunt_service);

export const Axiosinstance = axios.create({
    baseURL: API_restaurant,
});
