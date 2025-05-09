import ForgotPassword from "@/components/Forms/ForgotPassword"
import ContainerLayout from "@/components/Layout/ContainerLayout"
import TextHeader from "@/components/Ui/TextHeader"
import { content } from "@/content/Content"

const page = () => {

    return <>
        <ContainerLayout>
            <TextHeader
                title={content.forgotPasswordPage.title}
                description={content.forgotPasswordPage.description}
            />
            <ForgotPassword />
        </ContainerLayout>
    </>
}

export default page