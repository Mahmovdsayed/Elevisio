import AddNewBlog from "@/components/Dashboard/blog/AddNewBlog";
import BlogLayout from "@/components/Dashboard/blog/BlogLayout";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import NoContentFound from "@/components/Layout/NoContentFound";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { Metadata } from "next";
import { IoDocuments } from "react-icons/io5";
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardBlogPage.title}`,
        description: `${content.dashboardBlogPage.description}`,
        openGraph: {
            title: `${content.dashboardBlogPage.title}`,
            description: `${content.dashboardBlogPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardBlogPage.title}`,
            description: `${content.dashboardBlogPage.description}`,
        },
    };

}
const page = async () => {
    const blog = await getUserDataDashboard("dashboard/blog", "user-dashboard-blogs")
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardBlogPage.title}
                startContent={<IoDocuments />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <TextHeader
                    isDashboard
                    title={content.dashboardBlogPage.title}
                    description={content.dashboardBlogPage.description}
                />
                <AddNewBlog />
            </div>
            {blog?.blogCount > 0 ? <BlogLayout blogData={blog} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Blogs Found"
                    description="Add your blogs to share your thoughts and ideas with the world."
                />
            }
        </ContainerLayout>
    </>;
};

export default page;