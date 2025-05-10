"use server";

import { main } from "@/functions/getBackgroundColor";
import handleRateLimiting from "@/functions/handleRateLimiting";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Shop from "@/models/shop.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rateLimitResponse = await handleRateLimiting(
      req,
      "/api/dashboard/shop"
    );
    if (rateLimitResponse) return rateLimitResponse;
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user)
      return NextResponse.json({
        success: false,
        message: "User authentication failed. Please log in.",
      });

    const shop = await Shop.find({ userID: user.id });
    const shopCount = await Shop.countDocuments({ userID: user.id });

    if (!shopCount || shop.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No shop found for this user.",
        data: { shopCount },
      });
    }

    const shopWithColors = await Promise.all(
      shop.map(async (product) => {
        const imageUrl = product?.productImage?.url;

        if (!imageUrl) {
          return {
            ...product.toObject(),
            dominantColor: null,
            textColor: null,
          };
        }

        try {
          const { dominantColor, textColor } = await main(imageUrl);
          return {
            ...product.toObject(),
            dominantColor,
            textColor,
          };
        } catch (error) {
          return {
            ...product.toObject(),
            dominantColor: null,
            textColor: null,
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      message: "Shop retrieved successfully.",
      data: { shop: shopWithColors, shopCount },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
