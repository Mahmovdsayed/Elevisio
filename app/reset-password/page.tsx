import ResetPassword from "@/components/Forms/ResetPassword";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${content.loginPage.title}`,
        description: `${content.loginPage.description}`,
        openGraph: {
            title: `${content.loginPage.title}`,
            description: `${content.loginPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.loginPage.title}`,
            description: `${content.loginPage.description}`,
        },
    };

}
const page = () => {
    return <>
        <ContainerLayout>
            <TextHeader
                title={content.resetPasswordPage.title}
                description={content.resetPasswordPage.description}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPassword />
            </Suspense>
        </ContainerLayout >
    </>;
};

export default page;