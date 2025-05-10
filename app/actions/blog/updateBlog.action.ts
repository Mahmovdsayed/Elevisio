"use server";

import { connectToDatabase } from "@/lib/dbConnection";
import { authorizeUser, errResponse, successResponse } from "@/Helpers/helpers";
import { revalidateTag } from "next/cache";
import Blog from "@/models/blog.model";
import { BlogUpdateValidationSchema } from "@/Validation/updateBlog";

export async function updateBlog(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const blogID = formData.get("blogID");
    const blog = await Blog.findById(blogID);
    if (!blog) return errResponse("Blog not found");

    if (blog.userID.toString() !== user.id)
      return errResponse("You are not authorized to update this blog");

    const updatedBlog = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      status: formData.get("status") as string,
    };

    try {
      await BlogUpdateValidationSchema.validate(updatedBlog, {
        abortEarly: true,
      });
    } catch (error: any) {
      return errResponse(error.errors[0]);
    }

    await Blog.findByIdAndUpdate(blogID, updatedBlog, {
      new: true,
    });

    revalidateTag("user-dashboard-blogs");
    return successResponse("Blog updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
