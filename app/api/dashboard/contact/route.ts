"use server";

import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Contact from "@/models/contact.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/contact"
    );
    if (rateLimitResponse) return rateLimitResponse;

    await connectToDatabase();

    const user = await authenticateUser();
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });
    }

    const contacts = await Contact.find({ userID: user.id });

    if (!contacts || contacts.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No contact found for this user.",
        data: {
          socialLinksCount: 0,
        },
      });
    }

    const socialLinksCount = contacts.reduce((acc, contact) => {
      return acc + (contact.socialLinks?.length || 0);
    }, 0);

    return NextResponse.json({
      success: true,
      message: "Contacts retrieved successfully.",
      data: { contacts, socialLinksCount },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
