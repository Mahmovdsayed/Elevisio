"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Contact from "@/models/contact.model";
import { contactValidationSchema } from "@/Validation/contactValidation";
import { revalidateTag } from "next/cache";

export async function addContact(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const contactData = {
      platform: formData.get("platform"),
      url: formData.get("url"),
    };

    try {
      await contactValidationSchema.validate(contactData, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const existingContact = await Contact.findOne({
      userID: user.id,
      "socialLinks.platform": contactData.platform,
    });

    if (existingContact) {
      return await errResponse(
        `You already have a ${contactData.platform} link saved`
      );
    }

    await Contact.findOneAndUpdate(
      { userID: user.id },
      { $push: { socialLinks: contactData } },
      { upsert: true, new: true }
    );

    revalidateTag("user-dashboard-contact");

    return await successResponse("Contact added successfully");
  } catch (error) {
    return await errResponse("Failed to add contact");
  }
}
