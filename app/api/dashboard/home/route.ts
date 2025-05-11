"use server";

import { main } from "@/functions/getBackgroundColor";
import { authenticateUser } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Blog from "@/models/blog.model";
import Projects from "@/models/project.model";
import Skill from "@/models/skills.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import Experience from "@/models/work.model";
import Education from "@/models/education.model";
import Contact from "@/models/contact.model";
import Certificate from "@/models/certificate.model";
type CountKeys =
  | "projects"
  | "blogs"
  | "skills"
  | "experience"
  | "education"
  | "contact"
  | "certificate";
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const user = await authenticateUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const userInfo = await User.findById(user.id).select(
      "-password -otp -otpExpiry -__v"
    );

    let colors = { dominantColor: "#000000" };

    if (userInfo.image?.url) {
      try {
        colors = await main(userInfo.image.url);
      } catch (error) {
        console.error("Error extracting image colors:", error);
      }
    }

    const counts = {
      projects: await Projects.countDocuments({ userID: user.id }),
      blogs: await Blog.countDocuments({ userID: user.id }),
      skills: await Skill.countDocuments({ userID: user.id }),
      experience: await Experience.countDocuments({ userID: user.id }),
      education: await Education.countDocuments({ userID: user.id }),
      contact: await Contact.countDocuments({ userID: user.id }),
      certificate: await Certificate.countDocuments({ userID: user.id }),
    };

    const missingItems = Object.entries(counts)
      .filter(([_, count]) => count === 0)
      .map(([key]) => key);

    const HomeData = {
      fullName: userInfo.firstName + " " + userInfo.lastName,
      userName: user.userName,
      userEmail: user.userEmail,
      Image: userInfo.image?.url || null,
      position: userInfo.positionName || null,
      totalProjects: counts.projects,
      totalBlogs: counts.blogs,
      totalSkills: counts.skills,
      totalExperience: counts.experience,
      totalEducation: counts.education,
      totalContact: counts.contact,
      totalCertificate: counts.certificate,
      color: colors.dominantColor,
    };

    const requiredSections: CountKeys[] = [
      "projects",
      "blogs",
      "skills",
      "experience",
    ];
    const hasMinimumData = requiredSections.some(
      (section: CountKeys) => counts[section] > 0
    );

    const isWarning = missingItems.length > 0;

    if (!hasMinimumData) {
      return NextResponse.json({
        data: {
          success: false,
          HomeData,
          warning:
            "You need to add at least one item from (projects, blogs, skills, or experience) to create your page",
          isWarning: true,
          missingItems,
        },
      });
    }

    return NextResponse.json({
      data: {
        success: true,
        HomeData,
        isWarning,
        ...(isWarning && {
          warning:
            "Some sections are empty which may affect your page appearance",
          missingItems,
        }),
      },
    });
  } catch (error) {
    return NextResponse.json({
      data: {
        success: false,
        message: "something went wrong",
        isWarning: false,
      },
    });
  }
}
