"use server";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Note from "@/models/note.model";
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

    const note = await Note.find({ userID: user.id });
    const notesCount = await Note.countDocuments({ userID: user.id });
    if (!notesCount)
      return NextResponse.json({
        success: false,
        message: "No Notes found for this user.",
        data: {
          notesCount,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Notes retrieved successfully.",
      data: { note, notesCount },
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
