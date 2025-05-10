"use server";

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

interface RateLimiterOptions {
  interval: number;
  maxRequests: number;
  uniqueId: string;
  endpoint: string;
}

export async function rateLimiter({
  interval,
  maxRequests,
  uniqueId,
  endpoint,
}: RateLimiterOptions): Promise<NextResponse | null> {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }

  if (!redis) {
    return null;
  }

  const key = `rate_limit:${endpoint}:${uniqueId}`;

  try {
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, interval);
    }

    if (current > maxRequests) {
      return NextResponse.json({
        success: false,
        message: "Too Many Requests. Please try again later.",
      });
    }

    return null;
  } catch (error) {
    return null;
  }
}
