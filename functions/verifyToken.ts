/**
 * The function `verifyToken` in TypeScript verifies a JWT token using a secret key and returns the
 * payload if valid.
 * @param {string | undefined} token - The `token` parameter in the `verifyToken` function is a string
 * that represents the JWT (JSON Web Token) that needs to be verified. This token is typically sent by
 * clients to authenticate and authorize their requests to a server.
 * @returns The `verifyToken` function returns a `Promise` that resolves to the JWT payload
 * (`JWTPayload`) if the token is valid and not expired. If the token is invalid, expired, or missing
 * required information such as the user ID, the function will return `null`.
 */
"use server";
import { jwtVerify, JWTPayload } from "jose";

export const verifyToken = async (
  token: string | undefined
): Promise<JWTPayload | null> => {
  if (!token) {
    console.error("No token provided");
    return null;
  }

  try {
    const secretKey = process.env.LOGIN_SIG;
    if (!secretKey) {
      console.error("Missing LOGIN_SIG environment variable");
      return null;
    }

    const secret = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, secret);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      console.error("Token has expired");
      return null;
    }

    if (!payload.id) {
      console.error("Invalid token: Missing user ID");
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Invalid token:");
    return null;
  }
};
