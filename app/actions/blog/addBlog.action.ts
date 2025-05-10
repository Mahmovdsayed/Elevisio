"use server";

import { connectToDatabase } from "@/lib/dbConnection";
import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadBannerToCloudinary,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { BlogValidationSchema } from "@/Validation/blogValidation";
import Blog from "@/models/blog.model";
import { revalidateTag } from "next/cache";
export async function addBlog(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const blogData = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: formData.get("category"),
      seoKeywords: formData.getAll("seoKeywords"),
      blogImage: formData.get("blogImage"),
      status: formData.get("status"),
    };

    try {
      await BlogValidationSchema.validate(blogData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    const defaultImageUrl = "";
    let imageUrl = defaultImageUrl;
    let publicId = "";

    if (
      blogData.blogImage &&
      blogData.blogImage instanceof File &&
      blogData.blogImage.size > 0
    ) {
      const uploadResult = await uploadBannerToCloudinary(
        blogData.blogImage,
        user.userName,
        "Blog"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }

    const newBlog = new Blog({
      ...blogData,
      blogImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
    });

    await newBlog.save();
    revalidateTag("user-dashboard-blogs");

    return await successResponse("Blog added successfully");
  } catch (error) {
    console.log(error);
    return await errResponse("Something went wrong");
  }
}
