import axios from "axios";

const APIUrl = "https://api.miniapp.24cursach.ru";

const axiosPublic = axios.create({
  baseURL: APIUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { APIUrl, axiosPublic };
