"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Certificate from "@/models/certificate.model";
import { revalidateTag } from "next/cache";

export async function updateCertificate(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const certificateId = formData.get("certificateId") as string;
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) return { error: "Certificate not found" };

    if (certificate.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this certificate"
      );
    }
    const updatedCertificate = {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      certificateURL: formData.get("certificateURL") as string,
    };

    await Certificate.findByIdAndUpdate(certificateId, updatedCertificate, {
      new: true,
    });
    revalidateTag("user-dashboard-certificates");
    return await successResponse("Certificate updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
