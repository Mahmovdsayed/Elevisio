"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import {
  businessSkills,
  creativeSkills,
  designSkills,
  marketingSkills,
  techSkills,
} from "@/static/constant";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/skillsCategories"
    );
    if (rateLimitResponse) return rateLimitResponse;
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({ success: false, message: "Unauthorized" });

    const data = {
      tech: techSkills,
      design: designSkills,
      marketing: marketingSkills,
      business: businessSkills,
      creative: creativeSkills,
    };

    return NextResponse.json({
      success: true,
      message: "All skill categories retrieved successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
