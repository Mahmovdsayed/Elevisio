"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Projects from "@/models/project.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteUserProject(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const project = await Projects.findById(ID);
    if (!project) return await errResponse("Project not found");

    if (project.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this project"
      );

    if (project.projectImage?.public_id) {
      await deleteImageFromCloudinary(project.projectImage.public_id);
    }

    await Projects.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-projects");
    revalidateTag("home-data");
    return await successResponse("Your Project has been deleted successfully!");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
