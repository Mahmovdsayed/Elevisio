import LogInForm from "@/components/Forms/LogInForm";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import TextHeader from "@/components/Ui/TextHeader";
import { content, metadata } from "@/content/Content";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${metadata.loginPage.title}`,
        description: `${metadata.loginPage.description}`,
        openGraph: {
            title: `${metadata.loginPage.title}`,
            description: `${metadata.loginPage.description}`,
            siteName: "Elevisio"
        },
        twitter: {
            card: "summary_large_image",
            title: `${metadata.loginPage.title}`,
            description: `${metadata.loginPage.description}`,
        },
    };

}

const page = () => {
    return <>
        <ContainerLayout>
            <TextHeader
                title={content.loginPage.title}
                description={content.loginPage.description}
            />
            <LogInForm />
        </ContainerLayout>
    </>;
};

export default page;