"use server";
import { errResponse, hashPassword, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { resetPasswordValidationSchema } from "@/Validation/forgotPasswordValidation";

export async function resetPassword(pass: string, token: string) {
  try {
    await connectToDatabase();

    try {
      await resetPasswordValidationSchema.validate({
        password: pass,
        confirmPassword: pass,
        token,
      });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) return await errResponse("Invalid or expired token");

    user.password = await hashPassword(pass as string);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return await successResponse("Password reset successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
