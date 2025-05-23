"use server";

import User from "@/models/user.model";
import { connectToDatabase } from "@/lib/dbConnection";
import { generateOTP, sendOTPEmail } from "@/lib/sendOTPEmail";
import { signUpValidationSchema } from "@/Validation/SignUpValidation";
import { errResponse, hashPassword, successResponse } from "@/Helpers/helpers";

export async function signUpUser(formData: FormData) {
  try {
    await connectToDatabase();

    const userData = {
      userName: formData.get("userName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
    };

    try {
      await signUpValidationSchema.validate(userData, { abortEarly: true });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }

    const isUserNameExist = await User.findOne({ userName: userData.userName });
    if (isUserNameExist) {
      return await errResponse("Username already exists");
    }

    const isEmailExist = await User.findOne({ email: userData.email });
    if (isEmailExist) {
      return await errResponse("Email already exists");
    }

    const hashedPassword = await hashPassword(userData.password);

    let imageUrl =
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713493679/sqlpxs561zd9oretxkki.jpg";
    let publicId = "";

    const newUser = new User({
      ...userData,
      password: hashedPassword,
      image: { url: imageUrl, public_id: publicId },
      isVerified: false,
      otp: generateOTP(),
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000),
    });
    await newUser.save();

    await sendOTPEmail(newUser.email, newUser.otp);

    return await successResponse("User created successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
