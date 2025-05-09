"use server";

import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Blog from "@/models/blog.model";
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

    const blogs = await Blog.find({ userID: user.id });
    const blogCount = await Blog.countDocuments({ userID: user.id });

    if (!blogCount)
      return NextResponse.json({
        success: false,
        message: "No blogs found for this user.",
        data: {
          blogCount,
        },
      });
    return NextResponse.json({
      success: true,
      message: "Blogs retrieved successfully.",
      data: { blogs, blogCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
