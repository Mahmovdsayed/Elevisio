"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Education from "@/models/education.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteUserEducation(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const education = await Education.findById(ID);
    if (!education) return await errResponse("Education not found");

    if (education.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this education"
      );

    if (education.schoolImage?.public_id) {
      await deleteImageFromCloudinary(education.schoolImage.public_id);
    }

    await Education.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-education");
    revalidateTag("home-data");
    return await successResponse(
      "Your Education has been deleted successfully!"
    );
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
