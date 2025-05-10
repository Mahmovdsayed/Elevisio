"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadPdfToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import CV from "@/models/cv.model";
import { cvValidationSchema } from "@/Validation/cvValidation";
import { revalidateTag } from "next/cache";

export async function uploadCV(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const pdfCount = await CV.countDocuments({ userID: user.id });
    if (pdfCount >= 2) {
      return await errResponse(
        "You have reached the maximum limit of 2  CV uploads."
      );
    }

    const cvData = {
      name: formData.get("name"),
      isMainCV: formData.get("isMainCV"),
      CV: formData.get("CV"),
    };

    try {
      await cvValidationSchema.validate(cvData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    let pdfUrl = "";
    let publicId = "";

    if (cvData.CV && cvData.CV instanceof File && cvData.CV.size > 0) {
      const uploadResult = await uploadPdfToCloudinary(
        cvData.CV,
        user.userName,
        "CV"
      );
      if (uploadResult) {
        pdfUrl = uploadResult.pdfUrl;
        publicId = uploadResult.publicId;
      }
    }
    const newCV = new CV({
      ...cvData,
      userID: user.id,
      CV: { url: pdfUrl, public_id: publicId || null },
    });
    await newCV.save();

    if (cvData.isMainCV === "true") {
      await CV.updateMany(
        { userID: user.id, _id: { $ne: newCV._id } },
        { $set: { isMainCV: false } }
      );
    }

    revalidateTag("user-dashboard-cv");

    return await successResponse("Your CV has been uploaded successfully");
  } catch (error) {
    console.log(error);
    return await errResponse("Failed to upload your CV");
  }
}
