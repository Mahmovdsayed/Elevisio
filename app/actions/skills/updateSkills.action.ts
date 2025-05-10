"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Skill from "@/models/skills.model";
import { updateSkillValidationSchema } from "@/Validation/skillValidation";
import { revalidateTag } from "next/cache";

export async function updateSkill(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const skillId = formData.get("skillId") as string;
    const skill = await Skill.findById(skillId);
    if (!skill) return await errResponse("Skill not found");

    if (skill.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this education"
      );
    }

    const skillData = {
      name: formData.get("name"),
      category: formData.get("category"),
    };
    try {
      await updateSkillValidationSchema.validate(skillData, {
        abortEarly: true,
      });
    } catch (error: any) {
      await errResponse(error.errors[0]);
    }

    await Skill.findByIdAndUpdate(skillId, skillData, {
      new: true,
    });
    revalidateTag("user-dashboard-skills");
    return await successResponse("Skill updated successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
