"use server";

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnection";
import CV from "@/models/cv.model";
import { authenticateUser } from "@/Helpers/helpers";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const cv = await CV.find({ userID: user.id });
    const cvCount = await CV.countDocuments({ userID: user.id });
    if (!cvCount)
      return NextResponse.json({
        success: false,
        message: "No CV found for this user.",
        data: { cvCount },
      });

    return NextResponse.json({
      success: true,
      message: "CV retrieved successfully.",
      data: { cv, cvCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
