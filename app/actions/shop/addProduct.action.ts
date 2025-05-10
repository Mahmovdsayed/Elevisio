"use server";

import {
  authorizeUser,
  errResponse,
  notifyAdmin,
  successResponse,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import sendEmailService from "@/lib/email";
import Shop from "@/models/shop.model";
import { shopSchema } from "@/Validation/shopValidation";
import { revalidateTag } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const productsCount = await Shop.countDocuments({
      userID: user.id,
    });
    if (productsCount >= 10) {
      return await errResponse(
        "You have reached the maximum limit of 10 products."
      );
    }

    const productData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      discountPrice: formData.get("discountPrice")
        ? parseFloat(formData.get("discountPrice") as string)
        : null,
      hasDiscount: formData.get("hasDiscount") === "true",
      purchaseLink: formData.get("purchaseLink"),
      category: formData.get("category"),
      productImage: formData.get("productImage"),
    };

    try {
      await shopSchema.validate(productData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const defaultImageUrl =
      "https://res.cloudinary.com/dtpsyi5am/image/upload/v1745273589/wj3c8moo7quglamsgp5h.svg";
    let imageUrl = defaultImageUrl;
    let publicId = "";
    if (
      productData.productImage &&
      productData.productImage instanceof File &&
      productData.productImage.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        productData.productImage,
        user.userName,
        "Shop"
      );
      if (uploadResult) {
        imageUrl = uploadResult.imageUrl;
        publicId = uploadResult.publicId;
      }
    }
    const newProduct = new Shop({
      ...productData,
      productImage: { url: imageUrl, public_id: publicId || null },
      userID: user.id,
      status: "pending",
    });

    await newProduct.save();
    const emailHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 30px 0;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">🎉 Product Submitted Successfully!</h1>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">Hello <strong>${
            user.userName
          }</strong>,</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">Your product <strong style="color: #6366f1;">${
            productData.title
          }</strong> has been submitted successfully.</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <img src="${imageUrl}" alt="${
      productData.title
    }" style="max-width: 300px; max-height: 200px; border-radius: 8px; border: 1px solid #e2e8f0;"/>
          </div>
          
          ${
            productData.hasDiscount
              ? `
            <div style="margin: 20px 0; display: flex; justify-content: center; gap: 20px;">
              <div style="text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 12px;">Original Price</p>
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #ef4444; text-decoration: line-through;">$${productData.price}</p>
              </div>
              <div style="text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 12px;">Discounted Price</p>
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #10b981;">$${productData.discountPrice}</p>
              </div>
            </div>
          `
              : `
            <div style="text-align: center; margin: 20px 0;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">Price</p>
              <p style="margin: 0; font-size: 18px; font-weight: bold; color: #6366f1;">$${productData.price}</p>
            </div>
          `
          }
          
          <div style="background: #f1f5f9; border-left: 4px solid #667eea; padding: 16px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #334155; margin-top: 0; font-size: 16px;">⏳ Review Process</h3>
            <p style="color: #475569; margin-bottom: 0; font-size: 14px; line-height: 1.5;">
              Your product is now in <strong style="color: #6366f1;">admin review queue</strong>.
              This usually takes <strong style="color: #10b981;">less than 48 hours</strong>.
              Once approved, it will be <strong style="color: #6366f1;">automatically published</strong> in your store.
            </p>
          </div>
          
          <div style="margin-top: 30px;">
            <h3 style="color: #334155; font-size: 16px; margin-bottom: 12px;">🔍 What Happens Next?</h3>
            <ul style="color: #475569; padding-left: 20px; margin: 0; font-size: 14px; line-height: 1.6;">
              <li>Admin will review product details (typically within 1-2 days)</li>
              <li>You'll receive a confirmation email when published</li>
              <li>Product goes live immediately after approval</li>
            </ul>
          </div>
        </div>
        
        <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b;">
          <p style="margin: 0;">Need help? <a href="mailto:system.depolna@gmail.com" style="color: #6366f1; text-decoration: none;">Contact our support team</a></p>
          <p style="margin: 10px 0 0;">© ${new Date().getFullYear()} Elevisio. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
    await sendEmailService({
      to: user.email,
      subject: "Your Product is Under Review 🛍️",
      message: emailHtml,
    });

    const adminNotificationHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #4f46e5; padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0;">New Product Submission</h1>
      </div>
      
      <div style="padding: 20px;">
        <p style="font-size: 16px;"><strong>User:</strong> ${user.userName} (${
      user.email
    })</p>
        <p style="font-size: 16px;"><strong>Product:</strong> ${
          productData.title
        }</p>
        <p style="font-size: 16px;"><strong>Price:</strong> $${
          productData.price
        } ${
      productData.hasDiscount
        ? `(Discounted: $${productData.discountPrice})`
        : ""
    }</p>
        <p style="font-size: 16px;"><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="${process.env.ADMIN_DASHBOARD_URL}/shop/review/${
      newProduct._id
    }" 
             style="display: inline-block; padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 4px;">
            Review Product
          </a>
        </div>
      </div>
      
      <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 14px; color: #64748b;">
        <p style="margin: 0;">This is an automated notification. Please do not reply.</p>
      </div>
    </div>
    `;

    await notifyAdmin(
      `New Product Submission: ${productData.title}`,
      adminNotificationHtml
    );

    revalidateTag("user-dashboard-shop");
    return await successResponse("Product added successfully");
  } catch (error) {
    return await errResponse("Failed to add education");
  }
}
