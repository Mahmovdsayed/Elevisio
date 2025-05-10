import AddNewProduct from "@/components/Dashboard/shop/AddNewProduct";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import Breadcrumb from "@/components/Ui/Breadcrumb";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { getUserDataDashboard } from "@/services/services";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Metadata } from "next";
import NoContentFound from "@/components/Layout/NoContentFound";
import ShopLayout from "@/components/Dashboard/shop/ShopLayout";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.dashboardShopPage.title}`,
        description: `${content.dashboardShopPage.description}`,
        openGraph: {
            title: `${content.dashboardShopPage.title}`,
            description: `${content.dashboardShopPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.dashboardShopPage.title}`,
            description: `${content.dashboardShopPage.description}`,
        },
    };

}
const page = async () => {
    const shop = await getUserDataDashboard('dashboard/shop', 'user-dashboard-shop')
    return <>
        <ContainerLayout>
            <Breadcrumb
                isDashboard
                title={content.dashboardShopPage.title}
                startContent={<MdOutlineShoppingCart />}
            />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between ">
                <TextHeader
                    isDashboard
                    title={content.dashboardShopPage.title}
                    description={content.dashboardShopPage.description}
                />
                <AddNewProduct />
            </div>
            {shop?.shopCount > 0 ? <ShopLayout shopData={shop} /> :
                <NoContentFound
                    url="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1742825511/gqs9afbaw0nnfgc2cxj6.svg"
                    title="No Shop Data Found"
                    description="Add your products to showcase your items."
                />
            }
        </ContainerLayout>
    </>
}
export default page;