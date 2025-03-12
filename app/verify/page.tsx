import ContainerLayout from "@/components/Layout/ContainerLayout";
import OtpVerify from "@/components/OTP/OtpVerify";
import TextHeader from "@/components/Ui/TextHeader";
import { content } from "@/content/Content";
import { Suspense } from "react";

const page = () => {
    return <>
        <ContainerLayout>
            <TextHeader
                title={content.verifyPage.title}
                description={content.verifyPage.description}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <OtpVerify />
            </Suspense>
        </ContainerLayout>
    </>;
};

export default page;