import AddNewWork from "@/components/Dashboard/work/AddNewWork";
import WorkLayout from "@/components/Dashboard/work/WorkLayout";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { MdOutlineWork } from "react-icons/md";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardWorkPage.title}`,
        description: `${content.dashboardWorkPage.description}`,
        openGraph: {
            title: `${content.dashboardWorkPage.title}`,
            description: `${content.dashboardWorkPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardWorkPage.title}`,
            description: `${content.dashboardWorkPage.description}`,
        },
    };

}


const page = async () => {
    const work = await getUserDataDashboard("/dashboard/work", "user-dashboard-work")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardWorkPage.title}
                startContent={<MdOutlineWork />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardWorkPage.title}
                    description={content.dashboardWorkPage.description}
                />
                <AddNewWork />
            </div>
            {work?.workCount > 0 ? <WorkLayout workData={work} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Work Experience Found"
                    description="Add your work experience to showcase your professional journey and skills."
                />
            }
        </ContainerLayout>
    </>;
};

export default page;