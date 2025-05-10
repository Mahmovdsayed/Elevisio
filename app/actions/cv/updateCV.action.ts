"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import CV from "@/models/cv.model";
import { cvValidationSchema } from "@/Validation/cvValidation";
import { revalidateTag } from "next/cache";

export async function updateCV(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const cvId = formData.get("cvId") as string;
    const cv = await CV.findById(cvId);
    if (!cv) return await errResponse("CV not found");

    if (cv.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this CV."
      );
    }

    const cvData = {
      name: formData.get("name"),
      isMainCV: formData.get("isMainCV"),
    };

    try {
      await cvValidationSchema.validate(cvData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    if (cvData.isMainCV === "true") {
      await CV.updateMany(
        { userID: user.id, _id: { $ne: cvId } },
        { $set: { isMainCV: false } }
      );
    } else {
      await CV.updateMany(
        { userID: user.id, _id: { $ne: cvId } },
        { $set: { isMainCV: true } }
      );
    }

    await CV.findByIdAndUpdate(cvId, cvData, { new: true });
    revalidateTag("user-dashboard-cv");

    return await successResponse("CV updated successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
