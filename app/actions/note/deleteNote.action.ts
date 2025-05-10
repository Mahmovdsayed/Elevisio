"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Note from "@/models/note.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteNote(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const note = await Note.findById(ID);
    if (!note) return await errResponse("Note not found");

    if (note.userID.toString() !== user.id) {
      return await errResponse("You are not authorized to delete this note");
    }

    await Note.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-notes");
    return await successResponse("Your Note has been deleted successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
