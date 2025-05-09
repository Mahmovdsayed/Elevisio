import AddNewSkill from "@/components/Dashboard/skills/AddNewSkill";
import SkillsLayout from "@/components/Dashboard/skills/SkillsLayout";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { Metadata } from "next";
import { GiSkills } from "react-icons/gi";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardSkillsPage.title}`,
        description: `${content.dashboardSkillsPage.description}`,
        openGraph: {
            title: `${content.dashboardSkillsPage.title}`,
            description: `${content.dashboardSkillsPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardSkillsPage.title}`,
            description: `${content.dashboardSkillsPage.description}`,
        },
    };

}


const page = async () => {
    const skills = await getUserDataDashboard('dashboard/skills', 'user-dashboard-skills')

    return (
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardSkillsPage.title}
                startContent={<GiSkills />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardSkillsPage.title}
                    description={content.dashboardSkillsPage.description}
                />
                <AddNewSkill />
            </div>
            {skills?.skillsCount > 0 ? <SkillsLayout skillsData={skills} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Skills Data Found"
                    description="Add your skills to showcase your expertise and abilities."
                />
            }
        </ContainerLayout>
    );
};

export default page;