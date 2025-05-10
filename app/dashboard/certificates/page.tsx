import AddNewCertificate from "@/components/Dashboard/certificate/AddNewCertificate";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { LiaCertificateSolid } from "react-icons/lia";
import { Metadata } from "next";
import { getUserDataDashboard } from "@/services/services";
import NoContentFound from "@/components/Layout/NoContentFound";
import CertificateLayout from "@/components/Dashboard/certificate/CertificateLayout";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardCertificatePage.title}`,
        description: `${content.dashboardCertificatePage.description}`,
        openGraph: {
            title: `${content.dashboardCertificatePage.title}`,
            description: `${content.dashboardCertificatePage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardCertificatePage.title}`,
            description: `${content.dashboardCertificatePage.description}`,
        },
    };

}
const page = async () => {
    const certificate = await getUserDataDashboard("/dashboard/certificate", "user-dashboard-certificates")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardCertificatePage.title}
                startContent={<LiaCertificateSolid />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardCertificatePage.title}
                    description={content.dashboardCertificatePage.description}
                />
                <AddNewCertificate />
            </div>
            {certificate?.certificateCount > 0 ? <CertificateLayout certificateData={certificate} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Certificates Found"
                    description="Add your certificates to showcase your achievements and qualifications."
                />
            }
        </ContainerLayout>
    </>;
};


export default page;