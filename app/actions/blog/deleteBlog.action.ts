"use server";
import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Blog from "@/models/blog.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";
export async function deleteBlog(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;
    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const blog = await Blog.findById(ID);
    if (!blog) return await errResponse("Blog not found");
    if (blog.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this blog"
      );
    if (blog.blogImage?.public_id) {
      await deleteImageFromCloudinary(blog.blogImage.public_id);
    }
    await Blog.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-blogs");
    return await successResponse("Your Blog has been deleted successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
