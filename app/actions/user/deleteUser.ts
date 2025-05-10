"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import sendEmailService from "@/lib/email";
import Blog from "@/models/blog.model";
import Certificate from "@/models/certificate.model";
import Contact from "@/models/contact.model";
import CV from "@/models/cv.model";
import Education from "@/models/education.model";
import Event from "@/models/events.model";
import Note from "@/models/note.model";
import Projects from "@/models/project.model";
import Shop from "@/models/shop.model";
import Skill from "@/models/skills.model";
import User from "@/models/user.model";
import Experience from "@/models/work.model";
import { baseUrl } from "@/static/constant";
import { deleteSchema } from "@/Validation/workValidations";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteUser(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const isUserExist = await User.findById(ID);
    if (!isUserExist) return await errResponse("User not found");

    if (user.id !== ID) {
      return await errResponse("Unauthorized to delete this user");
    }

    const [
      blogs,
      events,
      certificates,
      cvs,
      educations,
      projects,
      shops,
      works,
    ] = await Promise.all([
      Blog.find({ userID: ID }),
      Event.find({ userID: ID }),
      Certificate.find({ userID: ID }),
      CV.find({ userID: ID }),
      Education.find({ userID: ID }),
      Projects.find({ userID: ID }),
      Shop.find({ userID: ID }),
      Experience.find({ userID: ID }),
    ]);

    const deleteImagePromises: Promise<void>[] = [];

    const addDeletionPromise = (public_id?: string) => {
      if (public_id) {
        deleteImagePromises.push(deleteImageFromCloudinary(public_id));
      }
    };

    blogs.forEach((blog) => addDeletionPromise(blog.blogImage?.public_id));
    events.forEach((event) => {
      addDeletionPromise(event.eventBanner?.public_id);
      addDeletionPromise(event.organizer?.image?.public_id);
    });
    certificates.forEach((cert) =>
      addDeletionPromise(cert.certificateImage?.public_id)
    );
    cvs.forEach((cv) => addDeletionPromise(cv.CV?.public_id));
    educations.forEach((edu) => addDeletionPromise(edu.schoolImage?.public_id));
    projects.forEach((project) =>
      addDeletionPromise(project.projectImage?.public_id)
    );
    shops.forEach((shop) => addDeletionPromise(shop.productImage?.public_id));
    works.forEach((work) => addDeletionPromise(work.companyImage?.public_id));
    addDeletionPromise(isUserExist.image?.public_id);

    await Promise.all(deleteImagePromises);

    await Promise.all([
      Blog.deleteMany({ userID: ID }),
      Event.deleteMany({ userID: ID }),
      Certificate.deleteMany({ userID: ID }),
      Contact.deleteMany({ userID: ID }),
      CV.deleteMany({ userID: ID }),
      Education.deleteMany({ userID: ID }),
      Note.deleteMany({ userID: ID }),
      Projects.deleteMany({ userID: ID }),
      Shop.deleteMany({ userID: ID }),
      Skill.deleteMany({ userID: ID }),
      Experience.deleteMany({ userID: ID }),
      User.findByIdAndDelete(ID),
    ]);

    await sendEmailService({
      to: user.email,
      subject: "Your Account Has Been Deleted",
      message: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; text-align: center; font-size: 16px;">Account Deletion Confirmation</h1>
            <p style="color: #555555; font-size: 13px; text-align: center;">
              We're sorry to see you go. Your account and all associated data have been permanently deleted from our systems.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <p style="color: #555555; font-size: 13px;">
                All your personal information, posts, and uploaded content have been completely removed in accordance with our data privacy policy.
              </p>
            </div>
            <p style="color: #555555; font-size: 13px; text-align: center;">
              If this was a mistake or you change your mind, we'll be happy to welcome you back anytime.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${baseUrl}/signup" target="_blank" style="display: inline-block; background-color: #000000; color: #ffffff; font-size: 14px; font-weight: bold; padding: 10px 25px; border-radius: 5px; text-decoration: none;">
                Create New Account
              </a>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888888; font-size: 12px; margin-bottom: 10px;">
                Connect with us:
              </p>
              <div style="display: flex; justify-content: center; gap: 15px; text-align: center;">
                <a href="${baseUrl}" target="_blank" style="color: #555555; font-size: 12px; text-decoration: none;">
                  Visit Our Website
                </a>
                <span style="color: #dddddd;">|</span>
                <a href="https://www.instagram.com/nest.dev/" target="_blank" style="color: #555555; font-size: 12px; text-decoration: none;">
                  Follow on Instagram
                </a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${baseUrl}" target="_blank" style="display: inline-block; text-decoration: none; padding: 5px 10px; border-radius: 5px; font-size: 13px;">
                © ${new Date().getFullYear()} Nest.dev. All rights reserved.
              </a>
            </div>
          </div>
        </div>
        `,
    });

    (await cookies()).delete("userToken");

    return await successResponse(
      "User account and all associated data have been permanently deleted"
    );
  } catch (error) {
    return await errResponse(
      "Failed to delete user account. Please try again."
    );
  }
}
