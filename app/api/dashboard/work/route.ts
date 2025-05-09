"use server";

import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Experience from "@/models/work.model";
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

    const work = await Experience.find({ userID: user.id });

    const workCount = await Experience.countDocuments({ userID: user.id });
    if (!workCount)
      return NextResponse.json({
        success: false,
        message: "No work experience found for this user.",
        data: {
          workCount,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Work experience retrieved successfully.",
      data: { work, workCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
