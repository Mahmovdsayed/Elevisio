"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Note from "@/models/note.model";
import { noteValidationSchema } from "@/Validation/noteValidation";
import { revalidateTag } from "next/cache";

export async function updateNote(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const noteID = formData.get("noteID");
    if (!noteID) return await errResponse("Note ID is required");
    const note = await Note.findById(noteID);
    if (!note) return await errResponse("Note not found");

    if (note.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this note"
      );
    }

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

    await Note.findByIdAndUpdate(noteID, noteData, {
      new: true,
    });

    revalidateTag("user-dashboard-notes");
    return await successResponse("Note updated successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
