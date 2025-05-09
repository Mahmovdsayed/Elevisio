"use server";

import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Education from "@/models/education.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const education = await Education.find({ userID: user.id });

    const educationCount = await Education.countDocuments({ userID: user.id });
    if (!educationCount)
      return NextResponse.json({
        success: false,
        message: "No Education found for this user.",
        data: {
          educationCount,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Education retrieved successfully.",
      data: { education, educationCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
