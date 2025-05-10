"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Certificate from "@/models/certificate.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
      const rateLimitResponse = await handleRateLimiting(
          req,
          "/api/dashboard/certificate"
        );
        if (rateLimitResponse) return rateLimitResponse;
    
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const certificate = await Certificate.find({ userID: user.id });
    const certificateCount = await Certificate.countDocuments({
      userID: user.id,
    });
    if (!certificateCount)
      return NextResponse.json({
        success: false,
        message: "No Certificate found for this user.",
        data: {
          certificateCount,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Certificate retrieved successfully.",
      data: { certificate, certificateCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
