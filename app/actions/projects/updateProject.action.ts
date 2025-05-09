"use server";

import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Projects from "@/models/project.model";
import { addProjectValidationSchema } from "@/Validation/projectValidations";
import { revalidateTag } from "next/cache";

export async function updateProjcets(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const projectID = formData.get("projectID") as string;

    const project = await Projects.findById(projectID);
    if (!project) return await errResponse("Project not found");

    if (project.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this Project"
      );
    }
    const updatedProject = {
      name: formData.get("name"),
      description: formData.get("description"),
      clientName: formData.get("clientName"),
      from: formData.get("from"),
      to: formData.get("to"),
      projectType: formData.get("projectType"),
      techStack: formData.getAll("techStack"),
      designTools: formData.getAll("designTools"),
      projectURL: formData.get("projectURL"),
      githubURL: formData.get("githubURL"),
      designFileURL: formData.get("designFileURL"),
      status: formData.get("status"),
    };
    try {
      await addProjectValidationSchema.validate(updatedProject, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    await Projects.findByIdAndUpdate(projectID, updatedProject, {
      new: true,
    });
    revalidateTag("user-dashboard-projects");
    return await successResponse("Project updated successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
