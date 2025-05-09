import Info from "@/components/Dashboard/Info/Info";
import ContainerLayout from "@/components/Layout/ContainerLayout"
import Breadcrumb from "@/components/Ui/Breadcrumb"
import TextHeader from "@/components/Ui/TextHeader"
import { content } from "@/content/Content"
import { main } from "@/functions/getBackgroundColor";
import { getUserDataDashboard } from "@/services/services";
import { User } from "@/types/userInfo.types";
import { FaInfoCircle } from "react-icons/fa";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardInfoPage.title}`,
        description: `${content.dashboardInfoPage.description}`,
        openGraph: {
            title: `${content.dashboardInfoPage.title}`,
            description: `${content.dashboardInfoPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardInfoPage.title}`,
            description: `${content.dashboardInfoPage.description}`,
        },
    };

}

const page = async () => {
    const user: User = await getUserDataDashboard("/dashboard/global", "user-dashboard-data")
    const { dominantColor, textColor } = await main(user?.image?.url);
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardInfoPage.title}
                startContent={<FaInfoCircle />}
            />
            <TextHeader
                isDashboard
                title={content.dashboardInfoPage.title}
                description={content.dashboardInfoPage.description}
            />
            <Info dominantColor={dominantColor} textColor={textColor} data={user} />
        </ContainerLayout>
    </>
}

export default page