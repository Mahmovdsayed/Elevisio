"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Skill from "@/models/skills.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteSkill(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const skill = await Skill.findById(ID);
    if (!skill) return await errResponse("Skill not found");

    if (skill.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this skill"
      );

    await Skill.findByIdAndDelete(ID);
    revalidateTag("home-data");
    revalidateTag("user-dashboard-skills");
    return await successResponse("Skill deleted successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
