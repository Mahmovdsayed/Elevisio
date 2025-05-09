"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Shop from "@/models/shop.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteProduct(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const product = await Shop.findById(ID);
    if (!product) return await errResponse("Product not found");

    if (product.userID.toString() !== user.id)
      return await errResponse("You are not authorized to delete this product");

    if (product.productImage?.public_id) {
      await deleteImageFromCloudinary(product.productImage.public_id);
    }
    await Shop.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-shop");
    return await successResponse("Your product has been deleted successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
