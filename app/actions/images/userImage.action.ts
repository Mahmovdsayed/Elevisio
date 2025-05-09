"use server";
import {
  authorizeUser,
  errResponse,
  successResponse,
  updateImageInCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import { uploadImageValidationSchema } from "@/Validation/imageValidation";
import { revalidateTag } from "next/cache";

export async function userMainImage(formData: FormData, folderName: string) {
  try {
    await connectToDatabase();
    const existingUser = await authorizeUser();
    if (!existingUser || "error" in existingUser) return existingUser;

    const userData = {
      image: formData.get("image") as File,
    };

    try {
      await uploadImageValidationSchema.validate(userData, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    if (!userData.image) return await errResponse("No image provided");

    const { imageUrl, publicId } = await updateImageInCloudinary(
      userData.image,
      existingUser.userName,
      folderName,
      existingUser.image.public_id
    );

    existingUser.image = {
      url: imageUrl,
      public_id: publicId,
    };

    await existingUser.save();

    revalidateTag("user-dashboard-data");
    return await successResponse("Image updated successfully");
  } catch (error: any) {
    console.error(error);
    return await errResponse("Something went wrong");
  }
}
