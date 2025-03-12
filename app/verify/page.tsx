import ContainerLayout from "@/components/Layout/ContainerLayout";
import OtpVerify from "@/components/OTP/OtpVerify";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";

const page = () => {
    return <>
        <ContainerLayout>
            <TextHeader
                title={content.verifyPage.title}
                description={content.verifyPage.description}
            />
            <OtpVerify />
        </ContainerLayout>
    </>;
};

export default page;