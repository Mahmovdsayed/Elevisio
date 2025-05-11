"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
  updateImageInCloudinary,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Experience from "@/models/work.model";
import {
  addNewWorkSchema,
  deleteSchema,
  updateWorkSchema,
} from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

function extractWorkData(formData: FormData) {
  return {
    companyName: formData.get("companyName") as string,
    positionName: formData.get("positionName") as string,
    description: formData.get("description") as string | null,
    from: formData.get("from") as string,
    to: formData.get("to") as string | null,
    companyImage: formData.get("companyImage") as File | null,
    current: formData.get("current") === "true",
    employmentType: formData.get("employmentType") as string,
  };
}

async function validateWorkData(workData: any, schema: any) {
  try {
    await schema.validate(workData, { abortEarly: true });
  } catch (error: any) {
    await errResponse(error.errors[0]);
  }

  if (!workData.to && !workData.current) {
    workData.current = true;
  }
  if (!workData.to && workData.current) {
    workData.to = null;
  }
}

async function handleCompanyImageUpload(
  companyImage: File | null,
  userName: string
) {
  const defaultImageUrl =
    "https://res.cloudinary.com/dtpsyi5am/image/upload/v1741391758/wpojdb4im9vb6lv1tim4.svg";
  let imageUrl = defaultImageUrl;
  let publicId = "";

  if (companyImage) {
    const uploadResult = await uploadImageToCloudinary(
      companyImage,
      userName,
      "Work"
    );
    if (uploadResult) {
      imageUrl = uploadResult.imageUrl;
      publicId = uploadResult.publicId;
    }
  }

  return { imageUrl, publicId };
}

function createNewWorkEntry(
  workData: any,
  userId: string,
  imageUrl: string,
  publicId: string
) {
  return new Experience({
    ...workData,
    companyImage: { url: imageUrl, public_id: publicId || null },
    userID: userId,
  });
}

export async function addNewWork(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;
    const experienceCount = await Experience.countDocuments({
      userID: user.id,
    });
    if (experienceCount >= 10)
      return await errResponse(
        "You have reached the maximum limit of 10 experiences."
      );

    const workData = extractWorkData(formData);
    await validateWorkData(workData, addNewWorkSchema);

    const { imageUrl, publicId } = await handleCompanyImageUpload(
      workData.companyImage,
      user.userName
    );

    const newWork = createNewWorkEntry(workData, user.id, imageUrl, publicId);
    await newWork.save();
    revalidateTag("home-data");
    revalidateTag("user-dashboard-work");
    return await successResponse("Work added successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}

export async function updateUserWork(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const workID = formData.get("workID") as string;
    const existingImage = formData.get("existingImage");
    const removeImage = formData.get("removeImage");

    const work = await Experience.findById(workID);
    if (!work) return await errResponse("Work not found");
    if (work.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this work"
      );
    }

    const workData = {
      companyName: formData.get("companyName") as string,
      positionName: formData.get("positionName") as string,
      description: formData.get("description") as string | null,
      from: formData.get("from") as string,
      to: formData.get("to") as string | null,
      current: formData.get("current") === "true",
      employmentType: formData.get("employmentType") as string,
    };

    await validateWorkData(workData, updateWorkSchema);

    let companyImage = work.companyImage;

    if (removeImage === "true") {
      if (companyImage && companyImage.public_id) {
        await deleteImageFromCloudinary(companyImage.public_id);
      }
      companyImage = null;
    } else if (formData.get("companyImage")) {
      const newImage = formData.get("companyImage") as File;

      if (companyImage && companyImage.public_id) {
        const uploadResult = await updateImageInCloudinary(
          newImage,
          user.userName,
          "Work",
          companyImage.public_id
        );
        if (uploadResult) {
          companyImage = {
            url: uploadResult.imageUrl,
            public_id: uploadResult.publicId,
          };
        }
      } else {
        const uploadResult = await uploadImageToCloudinary(
          newImage,
          user.userName,
          "Work"
        );
        if (uploadResult) {
          companyImage = {
            url: uploadResult.imageUrl,
            public_id: uploadResult.publicId,
          };
        }
      }
    } else if (existingImage) {
      try {
        companyImage = JSON.parse(existingImage as string);
      } catch (error) {
        console.error("Error parsing existing image:", error);
      }
    }

    await Experience.findByIdAndUpdate(
      workID,
      {
        ...workData,
        companyImage,
      },
      { new: true }
    );

    revalidateTag("user-dashboard-work");
    return await successResponse("Work experience updated successfully");
  } catch (error) {
    return errResponse("Something went wrong");
  }
}

export async function deleteUserWork(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      await errResponse(error.errors[0]);
    }

    const work = await Experience.findById(ID);
    if (!work) return await errResponse("Work not found");

    if (work.userID.toString() !== user.id)
      return await errResponse(
        "Unauthorized: You are not the owner of this work"
      );

    if (work.companyImage && work.companyImage.public_id) {
      await deleteImageFromCloudinary(work.companyImage.public_id);
    }

    await Experience.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-work");
    revalidateTag("home-data");
    return await successResponse(
      "Your work experience has been deleted successfully!"
    );
  } catch (error) {
    return errResponse("Something went wrong");
  }
}
