"use server";

import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { allowedImageTypes } from "@/static/constant";
import { cookies } from "next/headers";
import { verifyToken } from "@/functions/verifyToken";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import sendEmailService from "@/lib/email";
const allowedPdfTypes = ["application/pdf"];
import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const errResponse = async (msg: string) => {
  return {
    success: false,
    message: msg,
  };
};

const successResponse = async (msg: string) => {
  return {
    success: true,
    message: msg,
  };
};

const uploadImageToCloudinary = async (
  image: File,
  userName: any,
  folderName: string
) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
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
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const uploadBannerToCloudinary = async (
  image: File,
  userName: any,
  folderName: string
) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const userFolderPath = `portfolio/userImages/${userName}/${folderName}`;

  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: userFolderPath,
      width: 1920,
      height: 1080,
      crop: "fill",
      gravity: "center",
      use_filename: true,
      unique_filename: false,
      quality: "100",
      format: "webp",
      timeout: 60000,
    }
  );

  if (!uploadResult.secure_url || !uploadResult.public_id) {
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const deleteImageFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

const updateImageInCloudinary = async (
  image: File,
  userName: any,
  folderName: string,
  publicId: string
) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse("Invalid image format. Allowed formats: PNG, JPEG, JPG");
  }

  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      await errResponse("Failed to delete old image from Cloudinary.");
    }
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: `portfolio/userImages/${userName}/${folderName}`,
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

  if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const authenticateUser = async () => {
  const token = (await cookies()).get("userToken")?.value;
  if (!token) {
    await errResponse("Unauthorized: No token provided");
  }
  const decodedToken = await verifyToken(token);
  if (!decodedToken) {
    await errResponse("Unauthorized: Invalid token");
  }
  return decodedToken;
};

const authorizeUser = async () => {
  try {
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user?.id) {
      return await errResponse("Unauthorized: Invalid user");
    }

    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return await errResponse("User not found");
    }

    if (existingUser._id.toString() !== user.id) {
      return await errResponse("Unauthorized: User mismatch");
    }
    return existingUser;
  } catch (error: any) {
    return await errResponse("An unexpected error occurred");
  }
};

const uploadPdfToCloudinary = async (
  pdfFile: File,
  userName: string,
  folderName: string
): Promise<{ pdfUrl: string; publicId: string }> => {
  const allowedTypes = ["application/pdf"];
  if (!allowedTypes.includes(pdfFile.type)) {
    throw new Error("Only PDF files are allowed");
  }

  const uploadOptions = {
    folder: `portfolio/userImages/${userName}/${folderName}`,
    public_id: `${Date.now()}_${pdfFile.name.replace(/\.[^/.]+$/, "")}`,
    overwrite: false,
    format: "pdf",
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined
      ) => {
        if (error) {
          reject(new Error(`Upload failed: ${error.message}`));
          return;
        }
        if (!result?.secure_url) {
          reject(new Error("Upload completed but no URL returned"));
          return;
        }
        resolve({
          pdfUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    pdfFile
      .arrayBuffer()
      .then((buffer) => uploadStream.end(Buffer.from(buffer)))
      .catch((err) => {
        reject(new Error("Failed to read PDF file"));
      });
  });
};

export async function notifyAdmin(subject: string, htmlContent: string) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error("Admin email not configured");
    return false;
  }

  try {
    await sendEmailService({
      to: adminEmail,
      subject: subject,
      message: htmlContent,
    });
    return true;
  } catch (error) {
    console.error("Failed to notify admin:", error);
    return false;
  }
}
export {
  uploadImageToCloudinary,
  hashPassword,
  verifyPassword,
  errResponse,
  successResponse,
  authenticateUser,
  authorizeUser,
  updateImageInCloudinary,
  deleteImageFromCloudinary,
  uploadBannerToCloudinary,
  uploadPdfToCloudinary,
};
