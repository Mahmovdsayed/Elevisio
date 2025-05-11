"use client"

import { Card, CardBody, Divider, Link } from "@heroui/react";

const DashboardOverviewCard = () => {
    const dashboardSections = [
        {
            title: "Account Information",
            description: "Manage your account information",
            link: "/dashboard",
        },
        {
            title: "Work Experience",
            description:
                "Add and manage your work experiences to showcase your professional journey. Highlight your roles, responsibilities, and achievements to build a comprehensive profile that reflects your career growth and expertise.",
            link: "/dashboard/experience",
        },
        {
            title: "Education",
            description:
                "Manage your educational background here. Add, update, or remove your educational details to showcase your academic achievements.",
            link: "/dashboard/education",
        },
        {
            title: "Skills",
            description:
                "Add your skills, assign them to categories, and keep everything organized. A clear way to highlight what you’re good at.",
            link: "/dashboard/skills",
        },
        {
            title: "Projects",
            description:
                "Transform your portfolio into a dynamic showcase of your expertise. Curate, organize, and present your projects with rich details—from tech stacks to deliverables. Whether it’s a coding masterpiece, a design triumph, or a strategic campaign, this space lets your work speak volumes. Track progress with status updates, tag key skills, and link to live demos or repositories. Build a narrative of growth, innovation, and impact—one project at a time.",
            link: "/dashboard/projects",
        },
        {
            title: "Certificates",
            description:
                "Manage your certificates here. Add, update, or remove your certificates details to showcase your achievements.",
            link: "/dashboard/certificates",
        },
        {
            title: "Contact",
            description:
                "Manage your contact information here. Add, update, or remove your contact details to make it easy for others to reach you.",
            link: "/dashboard/contact",
        },
        {
            title: "Shop",
            description:
                "Add your product details including title, description, price, and an optional discount. You must upload a valid product image (PNG, JPEG, JPG, or GIF) under 5MB. Provide a purchase link and select the appropriate category.",
            link: "/dashboard/shop",
        },
        {
            title: "Blog",
            description:
                "Manage your blog posts and keep your audience updated with the latest news and insights.",
            link: "/dashboard/blog",
        },
        {
            title: "Events",
            description:
                "Manage all your events in one place. Create new events, edit existing ones, or remove outdated events. Add complete event details including banners, ticket options, schedules, and organizer information.",
            link: "/dashboard/events",
        },
        {
            title: "Private Notes & Tasks",
            description:
                "Your personal workspace - only you can see these notes. Organize your thoughts, tasks, and reminders in complete privacy.",
            link: "/dashboard/notes",
        },
        {
            title: "CV Builder",
            description:
                "Craft a standout CV effortlessly with our intuitive builder. Choose from professional templates, customize content, and download in various formats.",
            link: "/dashboard/cv",
        },
    ];

    return (
        <Card className="w-full">
            <CardBody>
                <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
                <Divider className="mb-2" />
                <ul className="space-y-3">
                    {dashboardSections.map((section, index) => (
                        <li key={index}>
                            <h3 className="text-sm md:text-xl font-semibold">
                                <Link href={section.link} showAnchorIcon className="text-blue-600 hover:underline">
                                    {section.title}
                                </Link>
                            </h3>
                            <p className="text-xs md:text-sm text-default-500">{section.description}</p>
                        </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
};

export default DashboardOverviewCard;
