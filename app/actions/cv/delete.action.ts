"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import CV from "@/models/cv.model";
import { revalidateTag } from "next/cache";

export async function deleteCV(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const cv = await CV.findById(ID);
    if (!cv) return await errResponse("CV not found");

    if (cv.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this CV."
      );
    }

    if (cv.CV?.public_id) {
      await deleteImageFromCloudinary(cv.CV.public_id);
    }

    if (cv.isMainCV === true) {
      await CV.updateMany(
        { userID: user.id, _id: { $ne: ID } },
        { $set: { isMainCV: true } }
      );
    } 

    await CV.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-cv");

    return await successResponse("Your CV has been deleted successfully!");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
