import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { MdEventSeat } from "react-icons/md";
import { Metadata } from "next";
import AddNewEvent from "@/components/Dashboard/events/AddNewEvent";
import { getUserDataDashboard } from "@/services/services";
import EventsLayout from "@/components/Dashboard/events/EventsLayout";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardEventPage.title}`,
        description: `${content.dashboardEventPage.description}`,
        openGraph: {
            title: `${content.dashboardEventPage.title}`,
            description: `${content.dashboardEventPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardEventPage.title}`,
            description: `${content.dashboardEventPage.description}`,
        },
    };

}
const page = async () => {
    const event = await getUserDataDashboard("dashboard/event", "user-dashboard-events")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardEventPage.title}
                startContent={<MdEventSeat />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardEventPage.title}
                    description={content.dashboardEventPage.description}
                />
            </div>
            <AddNewEvent />
            {event?.eventCount > 0 ? <EventsLayout eventData={event} /> :
                ""
            }
        </ContainerLayout>
    </>;
};

export default page;