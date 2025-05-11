import AddNewCV from "@/components/CV/AddNewCV";
import CvLayout from "@/components/CV/CvLayout";
import CvMaker from "@/components/CV/CvMaker";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { TbFileCv } from "react-icons/tb";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardCVPage.title}`,
        description: `${content.dashboardCVPage.description}`,
        openGraph: {
            title: `${content.dashboardCVPage.title}`,
            description: `${content.dashboardCVPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardCVPage.title}`,
            description: `${content.dashboardCVPage.description}`,
        },
    };

}
const page = async () => {
    const cv = await getUserDataDashboard("dashboard/uploaded-cv", "user-dashboard-cv")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardCVPage.title}
                startContent={<TbFileCv />}
            />
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between w-full">
                <div className="lg:flex-1">
                    <TextHeader
                        isDashboard
                        title={content.dashboardCVPage.title}
                        description={content.dashboardCVPage.description}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto lg:items-center">
                    <div className="w-full sm:w-auto">
                        <AddNewCV />
                    </div>
                    <div className="w-full sm:w-auto">
                        <CvMaker />
                    </div>
                </div>
            </div>
            {cv?.cvCount > 0 ? <CvLayout cvData={cv} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No CV Found"
                    description="Create a CV to showcase your skills and experience."
                />
            }
        </ContainerLayout>
    </>;
};

export default page;