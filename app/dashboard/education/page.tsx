import AddNewEducation from "@/components/Dashboard/education/AddNewEducation";
import EducationLayout from "@/components/Dashboard/education/EducationLayout";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { FcGraduationCap } from "react-icons/fc";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardEducationPage.title}`,
        description: `${content.dashboardEducationPage.description}`,
        openGraph: {
            title: `${content.dashboardEducationPage.title}`,
            description: `${content.dashboardEducationPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardEducationPage.title}`,
            description: `${content.dashboardEducationPage.description}`,
        },
    };

}
const page = async () => {
    const education = await getUserDataDashboard("/dashboard/education", "user-dashboard-education")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardEducationPage.title}
                startContent={<FcGraduationCap />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardEducationPage.title}
                    description={content.dashboardEducationPage.description}
                />
                <AddNewEducation />
            </div>
            {education?.educationCount > 0 ? <EducationLayout educationData={education} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Education Data Found"
                    description="Add your education details to showcase your academic journey and qualifications."
                />
            }
        </ContainerLayout>

    </>
}

export default page;