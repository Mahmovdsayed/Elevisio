import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import DashboardHomeCard from "@/components/Ui/DashboardHomeCard";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { FaHome } from "react-icons/fa";
import { Metadata } from "next";
import { getUserDataDashboard } from "@/services/services";
import HomeHeader from "@/components/Dashboard/home/HomeHeader";
import { Divider } from "@heroui/react";
import WarningCard from "@/components/Dashboard/home/WarningCard";
import DashboardSitemap from "@/components/Dashboard/home/DashboardSitemap";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardMainPage.title}`,
        description: `${content.dashboardMainPage.description}`,
        openGraph: {
            title: `${content.dashboardMainPage.title}`,
            description: `${content.dashboardMainPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardMainPage.title}`,
            description: `${content.dashboardMainPage.description}`,
        },
    };

}
const page = async () => {
    const homeData = await getUserDataDashboard("/dashboard/home", "home-data")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title="Home"
                startContent={<FaHome />}
            />
            <TextHeader
                isDashboard
                title={content.dashboardMainPage.title}
                description={content.dashboardMainPage.description}
            />
            <div>
                <Divider className="my-3" />
                <HomeHeader data={homeData} />
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <DashboardHomeCard title="Total Views" desc="0" />
                    <DashboardHomeCard url="/dashboard/projects" title="Total Projects" desc={homeData?.HomeData?.totalProjects} />
                    <DashboardHomeCard url="/dashboard/blog" title="Total Blogs" desc={homeData?.HomeData?.totalBlogs} />
                    <DashboardHomeCard url="/dashboard/skills" title="Total Skills" desc={homeData?.HomeData?.totalSkills} />
                </div>
                <Divider className="my-3" />
                {homeData?.isWarning ?
                    <WarningCard missingItems={homeData?.missingItems} warning={homeData?.warning} />
                    : ""}
            </div>
            <Divider className="my-3" />
            <DashboardSitemap />
        </ContainerLayout>
    </>;
};

export default page;
