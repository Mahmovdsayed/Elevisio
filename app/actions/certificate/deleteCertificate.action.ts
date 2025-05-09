"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Certificate from "@/models/certificate.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteCertificate(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;
    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const certificate = await Certificate.findById(ID);
    if (!certificate) return await errResponse("Certificate not found");
    if (certificate.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this certificate"
      );
    if (certificate.certificateImage?.public_id) {
      await deleteImageFromCloudinary(certificate.certificateImage.public_id);
    }

    await Certificate.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-certificates");

    return await successResponse(
      "Your Certificate has been deleted successfully!"
    );
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
