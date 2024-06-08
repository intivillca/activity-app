import axios from "axios";

const baseURL = process.env.REACT_APP_FILE_SERVER_URL;
const authToken = window.localStorage.getItem("authToken");

export const fileServerApi = axios.create({
  baseURL,
  timeout: 1000,
  headers: { Authorization: authToken },
});
