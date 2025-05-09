"use server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnection";
import User from "@/models/user.model";
import Experience from "@/models/work.model";
import Education from "@/models/education.model";
import Skill from "@/models/skills.model";
import Projects from "@/models/project.model";
import Certificate from "@/models/certificate.model";
import Contact from "@/models/contact.model";
import { authenticateUser } from "@/Helpers/helpers";

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const userID = await authenticateUser();
    if (!userID) {
      return NextResponse.json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const userId = userID.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    const requiredPersonalFields = [
      { field: "firstName", name: "First Name", required: true },
      { field: "lastName", name: "Last Name", required: true },
      { field: "email", name: "Email", required: true },
      { field: "positionName", name: "Job Title", required: true },
      { field: "city", name: "City", required: false },
      { field: "country", name: "Country", required: false },
      { field: "about", name: "About", required: false },
      { field: "phone", name: "Phone", required: false },
    ];

    const missingRequiredFields = requiredPersonalFields
      .filter((info) => info.required && !user[info.field])
      .map((info) => info.name);

    if (missingRequiredFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Incomplete information. Please fill in: ${missingRequiredFields.join(
          ", "
        )}. ${
          missingRequiredFields.length > 0
            ? `Also add at least one item in: ${missingRequiredFields.join(
                ", "
              )}`
            : ""
        }`,
      });
    }

    const [experiences, educations, skills, projects, certificates, contact] =
      await Promise.all([
        Experience.find({ userID: userId }).sort({ from: -1 }),
        Education.find({ userID: userId }).sort({ from: -1 }),
        Skill.find({ userID: userId }),
        Projects.find({ userID: userId }).sort({ from: -1 }),
        Certificate.find({ userID: userId }).sort({ date: -1 }),
        Contact.findOne({ userID: userId }),
      ]);

    const requiredSections = [
      { name: "Work Experience", data: experiences, required: true },
      { name: "Education", data: educations, required: true },
      { name: "Skills", data: skills, required: true },
      { name: "Projects", data: projects, required: false },
      { name: "Certifications", data: certificates, required: false },
    ];

    const missingRequiredSections = requiredSections
      .filter(
        (section) =>
          section.required && (!section.data || section.data.length === 0)
      )
      .map((section) => section.name);

    if (missingRequiredSections.length > 0) {
      return NextResponse.json({
        success: false,
        message: `CV cannot be generated. Please add at least one entry to: ${missingRequiredSections.join(
          ", "
        )}`,
      });
    }

    const cvData = {
      personalInfo: {
        fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        position: user.positionName || "Professional",
        email: user.email || "",
        phone: user.phone || "Not specified",
        location:
          [user.city, user.country].filter(Boolean).join(", ") ||
          "Not specified",
        website: user.website || null,
        about: user.about || "No bio provided",
        socialLinks:
          contact?.socialLinks?.map((link: string | any) => ({
            platform: link.platform || "other",
            url: link.url || "#",
          })) || [],
      },
      experiences: experiences.map((exp) => ({
        company: exp.companyName || "Company not specified",
        position: exp.positionName || "Position not specified",
        duration: `${exp.from || "Start date"} - ${
          exp.current ? "Present" : exp.to || "End date"
        }`,
        description: exp.description || "No description provided",
        employmentType: exp.employmentType || "Full-time",
        current: exp.current || false,
      })),
      educations: educations.map((edu) => ({
        institution: edu.schoolName || "Institution not specified",
        degree: edu.degree || edu.faculty || "Degree not specified",
        duration: `${edu.from || "Start date"} - ${
          edu.status ? "Currently Studying" : edu.to || "End date"
        }`,
        description: edu.description || null,
      })),
      skills: skills.reduce((acc, skill) => {
        const category = skill.category || "Other";
        acc[category] = acc[category] || [];
        acc[category].push(skill.name || "Unnamed skill");
        return acc;
      }, {} as Record<string, string[]>),
      projects:
        projects.length > 0
          ? projects.map((proj) => ({
              name: proj.name || "Unnamed project",
              description: proj.description || "No description available",
              technologies:
                (proj.techStack || []).join(", ") || "Not specified",
              links: [
                ...(proj.projectURL
                  ? [{ label: "View Project", url: proj.projectURL }]
                  : []),
                ...(proj.githubURL
                  ? [{ label: "GitHub", url: proj.githubURL }]
                  : []),
              ],
              duration:
                proj.from && proj.to ? `${proj.from} - ${proj.to}` : null,
            }))
          : null,
      certifications:
        certificates.length > 0
          ? certificates.map((cert) => ({
              name: cert.title || "Unnamed certification",
              date: cert.date || "Date not specified",
              credentialUrl: cert.certificateURL || null,
            }))
          : null,
    };

    const warnings = [
      ...(projects.length === 0 ? ["Projects section is empty"] : []),
      ...(certificates.length === 0 ? ["Certifications section is empty"] : []),
      ...(!user.about ? ["About section is empty"] : []),
    ];

    const message =
      warnings.length > 0
        ? `CV generated successfully. Note: ${warnings.join(", ")}`
        : "CV generated successfully";

    return NextResponse.json({
      success: true,
      data: cvData,
      message: message,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Failed to generate CV",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}
