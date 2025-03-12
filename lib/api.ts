"use server";
import { baseUrl } from "@/static/constant";
import axios from "axios";

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

export { api };
