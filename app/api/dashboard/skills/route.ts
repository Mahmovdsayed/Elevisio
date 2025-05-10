"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Skill from "@/models/skills.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/skills"
    );
    if (rateLimitResponse) return rateLimitResponse;
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const skills = await Skill.find({ userID: user.id });
    const skillsCount = await Skill.countDocuments({ userID: user.id });
    if (!skillsCount)
      return NextResponse.json({
        success: false,
        message: "No Skills found for this user.",
        data: {
          skillsCount,
        },
      });
    return NextResponse.json({
      success: true,
      message: "Education retrieved successfully.",
      data: { skills, skillsCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
