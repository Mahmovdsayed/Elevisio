"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Projects from "@/models/project.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/project"
    );
    if (rateLimitResponse) return rateLimitResponse;
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });
    const project = await Projects.find({ userID: user.id });
    const projectCount = await Projects.countDocuments({ userID: user.id });
    if (!projectCount)
      return NextResponse.json({
        success: false,
        message: "No project found for this user.",
        data: {
          projectCount,
        },
      });
    return NextResponse.json({
      success: true,
      message: "Project retrieved successfully.",
      data: { project, projectCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
