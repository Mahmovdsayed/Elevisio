"use server";
import { errResponse, hashPassword, successResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import { resetPasswordValidationSchema } from "@/Validation/forgotPasswordValidation";

export async function resetPassword(formData: FormData) {
  try {
    await connectToDatabase();
    const data = {
      password: formData.get("password"),
      token: formData.get("token"),
    };
    try {
      await resetPasswordValidationSchema.validate(data, {
        abortEarly: true,
      });
    } catch (validationError: any) {
      await errResponse(validationError.errors[0]);
    }
    const user = await User.findOne({
      resetPasswordToken: data.token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) return await errResponse("Invalid or expired token");

    user.password = hashPassword(data.password as string);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return await successResponse("Password reset successful");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
