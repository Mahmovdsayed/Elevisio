/* This TypeScript code snippet is creating an Axios instance named `nestAPI` configured to make HTTP
requests to a specific base URL. Here's a breakdown of what the code is doing: */
"use server";
import { baseUrl } from "@/static/constant";
import axios from "axios";
const nestAPI = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": baseUrl,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  },
});

export { nestAPI };
