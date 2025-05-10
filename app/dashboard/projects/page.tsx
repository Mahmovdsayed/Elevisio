import AddNewProject from "@/components/Dashboard/projects/AddNewProject";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { MdFolderCopy } from "react-icons/md";
import { Metadata } from "next";
import { getUserDataDashboard } from "@/services/services";
import ProjectsLayout from "@/components/Dashboard/projects/ProjectsLayout";
import NoContentFound from "@/components/Layout/NoContentFound";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardProjectsPage.title}`,
        description: `${content.dashboardProjectsPage.description}`,
        openGraph: {
            title: `${content.dashboardProjectsPage.title}`,
            description: `${content.dashboardProjectsPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardProjectsPage.title}`,
            description: `${content.dashboardProjectsPage.description}`,
        },
    };

}
const page = async () => {
    const projects = await getUserDataDashboard('dashboard/project', 'user-dashboard-projects')

    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardProjectsPage.title}
                startContent={<MdFolderCopy />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardProjectsPage.title}
                    description={content.dashboardProjectsPage.description}
                />
                <AddNewProject />
            </div>
            {projects?.projectCount > 0 ? <ProjectsLayout projectData={projects} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Projects Data Found"
                    description="Add your Projects to showcase your expertise and abilities."
                />
            }
        </ContainerLayout>
    </>;
};

export default page;