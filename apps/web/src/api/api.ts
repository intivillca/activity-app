import axios from "axios";

const baseURL = process.env.REACT_APP_DB_URL;
const authToken = window.localStorage.getItem("authToken");

export const api = axios.create({
  baseURL,
  timeout: 1000,
  headers: { Authorization: authToken },
});
