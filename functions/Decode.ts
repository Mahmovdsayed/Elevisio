/**
 * The function DecodedJWT decodes a JWT token retrieved from a cookie named "userToken".
 * @returns The `DecodedJWT` function is returning the decoded content of the JWT token stored in the
 * "userToken" cookie.
 */
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const DecodedJWT = async () => {
  const token = (await cookies()).get("userToken")?.value;
  const decoded = jwt.decode(token as any);
  return decoded;
};
export { DecodedJWT };
