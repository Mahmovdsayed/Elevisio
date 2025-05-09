import AddNewContact from "@/components/Dashboard/contact/AddNewContact"
import ContainerLayout from "@/components/Layout/ContainerLayout"
import Breadcrumb from "@/components/Ui/Breadcrumb"
import TextHeader from "@/components/Ui/TextHeader"
import { content } from "@/content/Content"
import { getUserDataDashboard } from "@/services/services"
import { FcGraduationCap } from "react-icons/fc"
import { Metadata } from "next";
import NoContentFound from "@/components/Layout/NoContentFound"
import ContactLayout from "@/components/Dashboard/contact/ContactLayout"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardContactPage.title}`,
        description: `${content.dashboardContactPage.description}`,
        openGraph: {
            title: `${content.dashboardContactPage.title}`,
            description: `${content.dashboardContactPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardContactPage.title}`,
            description: `${content.dashboardContactPage.description}`,
        },
    };

}
const page = async () => {
    const contact = await getUserDataDashboard("/dashboard/contact", "user-dashboard-contact")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardContactPage.title}
                startContent={<FcGraduationCap />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardContactPage.title}
                    description={content.dashboardContactPage.description}
                />
                <AddNewContact />
            </div>
            {contact?.socialLinksCount > 0 ? <ContactLayout contactData={contact} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No contact Data Found"
                    description="You don't have any contact data yet. Add your first contact now!"
                />
            }
        </ContainerLayout>
    </>
}

export default page