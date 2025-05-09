"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Note from "@/models/note.model";
import { noteValidationSchema } from "@/Validation/noteValidation";
import { revalidateTag } from "next/cache";

export async function addNote(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const noteData = {
      title: formData.get("title"),
      content: formData.get("content"),
      type: formData.get("type"),
      isCompleted: formData.get("isCompleted"),
      priority: formData.get("priority"),
    };

    try {
      await noteValidationSchema.validate(noteData, { abortEarly: false });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const newNote = new Note({
      ...noteData,
      userID: user.id,
    });

    await newNote.save();
    revalidateTag("user-dashboard-notes");

    return await successResponse("Note added successfully");
  } catch (error) {
    console.log(error);
    return await errResponse("Something went wrong");
  }
}
