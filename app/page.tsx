import ContainerLayout from "@/components/Layout/ContainerLayout";
import TextHeader from "@/components/Ui/TextHeader";
import { content, metadata } from "@/content/Content";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${content.homePage.title}`,
    description: `${content.homePage.description}`,
    openGraph: {
      title: `${content.homePage.title}`,
      description: `${content.homePage.description}`,
      siteName: `${metadata.siteName}`
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.signUpPage.title}`,
      description: `${content.homePage.description}`,
    },
  };

}

export default function Home() {
  return <>
    <ContainerLayout>
      <TextHeader
        title={content.homePage.title}
        description={content.homePage.description}
      />
    </ContainerLayout>
  </>
}
