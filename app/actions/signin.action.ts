"use server";

import {
  errResponse,
  successResponse,
  verifyPassword,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { signInValidationSchema } from "@/Validation/LoginValidation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function signInUser(formData: FormData) {
  try {
    await connectToDatabase();
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      await signInValidationSchema.validate(userData, { abortEarly: true });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }

    const isEmailExist = await User.findOne({ email: userData.email });
    if (!isEmailExist) return await errResponse("Invalid login credentials");

    if (!isEmailExist.isVerified)
      return await errResponse("Please verify your email first");

    const isPassMatched = verifyPassword(
      userData.password,
      isEmailExist.password
    );
    if (!isPassMatched) return await errResponse("Invalid login credentials");

    const token = jwt.sign(
      {
        id: isEmailExist._id,
        userEmail: isEmailExist.email,
        userName: isEmailExist.userName,
      },
      process.env.LOGIN_SIG || "",
      { expiresIn: "30d" }
    );
    // (await cookies()).set("userToken", token, {
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   path: "/",
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    // });
    return await successResponse(
      `Welcome back ${isEmailExist.userName} 👋`
    );
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}