"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Skill from "@/models/skills.model";
import { skillValidationSchema } from "@/Validation/skillValidation";
import { revalidateTag } from "next/cache";

export async function addSkill(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const skillNames = formData.getAll("name[]") as string[];

    const nonEmptySkills = skillNames.filter((name) => name.trim() !== "");

    if (nonEmptySkills.length === 0) {
      return await errResponse("At least one skill name is required");
    }

    const category = formData.get("category") as string;

    try {
      await skillValidationSchema.validate(
        {
          name: nonEmptySkills,
          category,
        },
        { abortEarly: false }
      );
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const savePromises = nonEmptySkills.map((name) => {
      const newSkill = new Skill({
        name: name.trim(),
        category,
        userID: user.id,
      });
      return newSkill.save();
    });

    await Promise.all(savePromises);
    revalidateTag("user-dashboard-skills");
    revalidateTag("home-data");
    return await successResponse("Skills added successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
