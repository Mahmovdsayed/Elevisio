import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./functions/verifyToken";

export async function middleware(req: any) {
  const token = (await cookies()).get("userToken")?.value;
  const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://www.elevisio.online"
  );
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set("Access-Control-Max-Age", "86400");

  if (!token) {
    console.warn("🔴 No token found in cookies.");
    return pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/login", req.url))
      : response;
  }

  const decodedToken = await verifyToken(token);

  if (!decodedToken) {
    console.error("🔴 Invalid or expired token.");
    return pathname.startsWith("/dashboard")
      ? NextResponse.redirect(new URL("/login", req.url))
      : response;
  }

  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
