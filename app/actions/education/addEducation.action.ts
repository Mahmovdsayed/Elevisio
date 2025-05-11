"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Education from "@/models/education.model";
import { educationSchema } from "@/Validation/educationValidation";
import { revalidateTag } from "next/cache";

export async function addNewEducation(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const educationCount = await Education.countDocuments({
      userID: user.id,
    });
    if (educationCount >= 10) {
      return await errResponse(
        "You have reached the maximum limit of 10 Educations."
      );
    }

    const educationData = {
      schoolName: formData.get("schoolName"),
      faculty: formData.get("faculty"),
      status: formData.get("status"),
      gpa: formData.get("gpa")
        ? parseFloat(formData.get("gpa") as string)
        : null,
      location: formData.get("location"),
      certificateURL: formData.get("certificateURL"),
      from: formData.get("from"),
      description: formData.get("description") as string | null,
      to: formData.get("to"),
      schoolImage: formData.get("schoolImage"),
    };

    try {
      await educationSchema.validate(educationData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1741391758/z9mzkfjfalpokwes25er.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      educationData.schoolImage &&
      educationData.schoolImage instanceof File &&
      educationData.schoolImage.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        educationData.schoolImage,
        user.userName,
        "Education"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    const newEducation = new Education({
      ...educationData,
      schoolImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    await newEducation.save();
    revalidateTag("user-dashboard-education");
    revalidateTag("home-data");
    return await successResponse("Education added successfully");
  } catch (error: any) {
    return await errResponse("Failed to add education");
  }
}
