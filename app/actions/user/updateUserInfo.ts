"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import { updateUserInfoSchema } from "@/Validation/UpdateUserInfoValidation";
import { revalidateTag } from "next/cache";

export async function updateUserInfo(formData: FormData) {
  try {
    await connectToDatabase();
    const existingUser = await authorizeUser();
    if (!existingUser || "error" in existingUser) return existingUser;

    const userData: Record<string, any> = {};

    const fields = [
      "firstName",
      "lastName",
      "positionName",
      "phone",
      "website",
      "about",
      "country",
      "nationality",
      "city",
      "birthday",
      "gender",
    ];

    fields.forEach((field) => {
      const value = formData.get(field);
      if (value) {
        userData[field] = String(value).trim();
      } else {
        userData[field] = "";
      }
    });

    try {
      await updateUserInfoSchema.validate(userData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    Object.keys(userData).forEach((key) => {
      if (userData[key] !== null && userData[key] !== undefined) {
        existingUser[key] = userData[key];
      } else {
        existingUser[key] = null;
      }
    });

    await existingUser.save();

    revalidateTag("user-dashboard-data");

    return await successResponse("User updated successfully");
  } catch (error: any) {
    return await errResponse("An unexpected error occurred");
  }
}
