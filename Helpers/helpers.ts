"use server";

import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { allowedImageTypes } from "@/static/constant";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(
  image: File,
  userName: any,
  folderName: string
) {
  if (!allowedImageTypes.includes(image.type)) {
    throw new Error("Invalid image format. Allowed formats: PNG, JPEG, JPG");
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const userFolderPath = `portfolio/userImages/${userName}/${folderName}`;

  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: userFolderPath,
      width: 500,
      height: 500,
      crop: "fill",
      gravity: "faces",
      use_filename: true,
      unique_filename: false,
      quality: "100",
      format: "webp",
    }
  );

  if (!uploadResult.secure_url || !uploadResult.public_id) {
    throw new Error("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
}

export async function hashPassword(password: string) {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
  return bcrypt.hashSync(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

export const errResponse = async (msg: string) => {
  return {
    success: false,
    message: msg,
  };
};

export const successResponse = async (msg: string) => {
  return {
    success: true,
    message: msg,
  };
};
