'use client'
import { Card, CardBody, CardHeader } from "@heroui/react";

interface IProps {
    warning: string;
    missingItems: string[];
}

const sectionsInfo: Record<string, { title: string; link: string; required: boolean; message: string }> = {
    projects: {
        title: "Projects",
        link: "/dashboard/projects",
        required: true,
        message: "Your projects are one of the most important parts of your portfolio. Without at least one, your page won’t go live.",
    },
    blogs: {
        title: "Blogs",
        link: "/dashboard/blog",
        required: false,
        message: "Adding blog posts is optional. It helps show your thoughts and ideas, but your page can still be created without it.",
    },
    skills: {
        title: "Skills",
        link: "/dashboard/skills",
        required: true,
        message: "Skills help people understand what you’re good at. At least one skill is needed to complete your page.",
    },
    experience: {
        title: "Work Experience",
        link: "/dashboard/experience",
        required: true,
        message: "Adding your work experience shows what you've done before. This section is required to publish your site.",
    },
    education: {
        title: "Education",
        link: "/dashboard/education",
        required: true,
        message: "Sharing your education background adds value to your profile. It’s strongly recommended.",
    },
    contact: {
        title: "Contact",
        link: "/dashboard/contact",
        required: true,
        message: "This is how visitors will reach you. Without it, people won’t be able to get in touch.",
    },
    certificate: {
        title: "Certificates",
        link: "/dashboard/certificates",
        required: false,
        message: "Certificates aren’t required, but they help show your achievements. Feel free to add any you have.",
    },
};

const WarningCard = ({ warning, missingItems }: IProps) => {
    return (
        <Card className="bg-warning-50" shadow="none">
            <CardHeader>
                <h4 className="text-base md:text-xl font-semibold">
                    ⚠️ Warning - {warning}
                </h4>
            </CardHeader>
            <CardBody className="space-y-3">
                {missingItems.map((item, index) => {
                    const section = sectionsInfo[item];
                    if (!section) return null;

                    return (
                        <div key={index}>
                            <p className="text-medium text-default-800 font-semibold">
                                • {section.title}
                            </p>
                            <p className="text-sm text-default-600">
                                {section.message}
                                <br />
                                {section.required ? (
                                    <>
                                        👉 Please go to{" "}
                                        <a href={section.link} className="text-blue-600 underline">
                                            {section.link}
                                        </a>{" "}
                                        and add this as soon as you can — it’s needed to make your page work properly.
                                    </>
                                ) : (
                                    <>
                                        📝 Optional, but highly recommended —{" "}
                                        <a href={section.link} className="text-blue-600 underline">
                                            {section.link}
                                        </a>
                                    </>
                                )}
                            </p>
                        </div>
                    );
                })}
            </CardBody>
        </Card>
    );
};

export default WarningCard;
