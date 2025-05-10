import SignUpForm from "@/components/Forms/SignUpForm";
import ContainerLayout from "@/components/Layout/ContainerLayout";
import TextHeader from "@/components/Ui/TextHeader";
import { content, metadata } from "@/content/Content";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${metadata.signUpPage.title}`,
        description: `${metadata.signUpPage.description}`,
        openGraph: {
            title: `${metadata.signUpPage.title}`,
            description: `${metadata.signUpPage.description}`,
            siteName: `${metadata.siteName}`
        },
        twitter: {
            card: "summary_large_image",
            title: `${content.signUpPage.title}`,
            description: `${metadata.signUpPage.description}`,
        },
    };

}

const page = () => {

    return <>
        <ContainerLayout>
            <TextHeader
                title={content.signUpPage.title}
                description={content.signUpPage.description}
            />
            <SignUpForm />
        </ContainerLayout>

    </>
}


export default page;