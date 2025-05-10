import AddNewNote from "@/components/Dashboard/notes/AddNewNote";
import NotesLayout from "@/components/Dashboard/notes/NotesLayout";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { Metadata } from "next";
import { FaNoteSticky } from "react-icons/fa6";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardNotePage.title}`,
        description: `${content.dashboardNotePage.description}`,
        openGraph: {
            title: `${content.dashboardNotePage.title}`,
            description: `${content.dashboardNotePage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardNotePage.title}`,
            description: `${content.dashboardNotePage.description}`,
        },
    };

}

const page = async () => {
    const note = await getUserDataDashboard("dashboard/notes", "user-dashboard-notes")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardNotePage.title}
                startContent={<FaNoteSticky />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardNotePage.title}
                    description={content.dashboardNotePage.description}
                />
                <AddNewNote />
            </div>
            {note?.notesCount > 0 ? <NotesLayout noteData={note} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Notes Data Found"
                    description="Add your notes to keep track of your ideas and tasks."
                />
            }
        </ContainerLayout>
    </>
}
export default page;