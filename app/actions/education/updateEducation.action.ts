"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Education from "@/models/education.model";
import { educationSchema } from "@/Validation/educationValidation";
import { revalidateTag } from "next/cache";

export async function updateEducation(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const educationId = formData.get("educationId") as string;
    const education = await Education.findById(educationId);
    if (!education) return await errResponse("Education not found");

    if (education.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this education"
      );
    }

    const updatedEducation = {
      schoolName: formData.get("schoolName") as string,
      faculty: formData.get("faculty") as string,
      status: formData.get("status") as string,
      gpa: formData.get("gpa")
        ? parseFloat(formData.get("gpa") as string)
        : null,
      location: formData.get("location"),
      certificateURL: formData.get("certificateURL"),
      from: formData.get("from"),
      description: formData.get("description") as string | null,
      to: formData.get("to"),
    };

    try {
      await educationSchema.validate(updatedEducation, { abortEarly: true });
    } catch (error: any) {
      await errResponse(error.errors[0]);
    }

    await Education.findByIdAndUpdate(educationId, updatedEducation, {
      new: true,
    });
    revalidateTag("user-dashboard-education");
    return await successResponse("Education updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
