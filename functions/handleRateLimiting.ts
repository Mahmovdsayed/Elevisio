"use server";
import { rateLimiter } from "@/lib/rateLimiter";

function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

async function handleRateLimiting(req: Request, endpoint: string) {
  const ip = getClientIP(req);
  return await rateLimiter({
    interval: 60,
    maxRequests: 10,
    uniqueId: ip,
    endpoint,
  });
}

export default handleRateLimiting;
