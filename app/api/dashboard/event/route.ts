"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Event from "@/models/events.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/event"
    );
    if (rateLimitResponse) return rateLimitResponse;
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const event = await Event.find({ userID: user.id });
    const eventCount = await Event.countDocuments({ userID: user.id });
    if (!eventCount)
      return NextResponse.json({
        success: false,
        message: "No Events found for this user.",
        data: {
          eventCount,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Events retrieved successfully.",
      data: { event, eventCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
