"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Contact from "@/models/contact.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteContact(contactID: string, linkID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID: contactID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const contact = await Contact.findOne({
      _id: contactID,
      userID: user.id,
    });

    if (!contact) return await errResponse("Contact not found");

    const updatedContact = await Contact.findByIdAndUpdate(
      contactID,
      {
        $pull: { socialLinks: { _id: linkID } },
      },
      { new: true }
    );

    if (!updatedContact) {
      return await errResponse("Failed to delete contact link");
    }

    revalidateTag("user-dashboard-contact");
    return await successResponse("Contact link deleted successfully!");
  } catch (error) {
    console.error("Delete contact error:", error);
    return await errResponse("Something went wrong");
  }
}
