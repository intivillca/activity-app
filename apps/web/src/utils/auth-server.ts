import axios from "axios";

const baseURL = process.env.AUTH_URL;

export const authApi = axios.create({
  baseURL,
  timeout: 1000,
});
