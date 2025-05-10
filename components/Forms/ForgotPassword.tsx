'use client'

import { forgotPasswordInitialState } from "@/services/InitialState";
import FormMotion from "../motion/FormMotion";
import FormInput from "../Ui/FormInput";
import { forgotPasswordValidationSchema } from "@/Validation/forgotPasswordValidation";
import useFormHandler from "@/hooks/useFormHandler";
import { forgotPassword } from "@/app/actions/auth/forgotPassword.action";
import NestErrors from "../Ui/NestErrors";
import useHandleResponse from "@/hooks/useHandleResponse";
import { IoIosSend } from "react-icons/io";
import SubmitButton from "../Ui/SubmitButton";

const ForgotPassword = () => {
    const handleResponse = useHandleResponse();
    const formik = useFormHandler(forgotPasswordInitialState, forgotPasswordValidationSchema, async (values) => {
        await handleResponse(forgotPassword(values.email), formik.resetForm);
    });

    return <>
        <form
            className="flex mx-auto flex-col mt-6 lg:w-9/12 lg:mx-auto"
            onSubmit={formik.handleSubmit}
        >
            <FormMotion delay={0.4}>
                <FormInput
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    description="Enter your email address to receive instructions for resetting your password."
                    placeholder="Enter Your Email"
                />
                {formik.touched.email && formik.errors.email && (
                    <NestErrors title={formik.errors.email} color='warning' />
                )}
            </FormMotion>
            <FormMotion delay={0.5}>
                <SubmitButton
                    title="Send"
                    isDisabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                    startContent={<IoIosSend />}
                    className="mt-3"
                />
            </FormMotion>
        </form>
    </>;
};

export default ForgotPassword;