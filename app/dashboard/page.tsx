import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import DashboardHomeCard from "@/components/Ui/DashboardHomeCard";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";

const page = () => {
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
            />
            <TextHeader
                isDashboard
                title={content.dashboardMainPage.title}
                description={content.dashboardMainPage.description}
            />
            <div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <DashboardHomeCard title="Total Views" desc="1234" />
                    <DashboardHomeCard title="Projects" desc="12" />
                    <DashboardHomeCard title="Blog Posts" desc="24" />
                    <DashboardHomeCard title="Skills" desc="26" />
                </div>
            </div>
        </ContainerLayout>
    </>;
};

export default page;
