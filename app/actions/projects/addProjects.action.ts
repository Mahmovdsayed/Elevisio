"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadBannerToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Projects from "@/models/project.model";
import { addProjectValidationSchema } from "@/Validation/projectValidations";
import { revalidateTag } from "next/cache";

export async function addProject(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const projectsCount = await Projects.countDocuments({
      userID: user.id,
    });
    if (projectsCount >= 20) {
      return await errResponse(
        "You have reached the maximum limit of 20 projects."
      );
    }

    const projectData = {
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
      projectImage: formData.get("projectImage"),
    };

    try {
      await addProjectValidationSchema.validate(projectData, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1744531619/gw1ynmeg1wkxq9mslbe4.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      projectData.projectImage &&
      projectData.projectImage instanceof File &&
      projectData.projectImage.size > 0
    ) {
      const uploadResult = await uploadBannerToCloudinary(
        projectData.projectImage,
        user.userName,
        "Project"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    const newProject = new Projects({
      ...projectData,
      projectImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    await newProject.save();
    revalidateTag("user-dashboard-projects");
    revalidateTag("home-data");
    return await successResponse("Project added successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
