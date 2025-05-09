"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadBannerToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Certificate from "@/models/certificate.model";
import { certificateValidationSchema } from "@/Validation/certificateValidation";
import { revalidateTag } from "next/cache";

export async function addCertificate(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const certificateCount = await Certificate.countDocuments({
      userID: user.id,
    });
    if (certificateCount >= 10) {
      return await errResponse(
        "You have reached the maximum limit of 10 Certificates."
      );
    }
    const certificateData = {
      title: formData.get("title"),
      date: formData.get("date"),
      certificateURL: formData.get("certificateURL"),
      certificateImage: formData.get("certificateImage"),
    };

    try {
      await certificateValidationSchema.validate(certificateData, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1744801386/xljvt3pybb7lmqmpylc2.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";
    if (
      certificateData.certificateImage &&
      certificateData.certificateImage instanceof File &&
      certificateData.certificateImage.size > 0
    ) {
      const uploadResult = await uploadBannerToCloudinary(
        certificateData.certificateImage,
        user.userName,
        "Certificate"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    const newCertificate = new Certificate({
      ...certificateData,
      certificateImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    await newCertificate.save();
    revalidateTag("user-dashboard-certificates");

    return await successResponse("Certificate added successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
