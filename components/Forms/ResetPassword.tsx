'use client'

import { useSearchParams } from "next/navigation";
import FormMotion from "../motion/FormMotion";
import FormInputPassword from "../Ui/FormInputPassword";
import useHandleResponse from "@/hooks/useHandleResponse";
import useFormHandler from "@/hooks/useFormHandler";
import { resetPasswordValidationSchema } from "@/Validation/forgotPasswordValidation";
import { resetPasswordInitialState } from "@/services/InitialState";
import { resetPassword } from "@/app/actions/auth/resetPassword.action";
import NestErrors from "../Ui/NestErrors";
import SubmitButton from "../Ui/SubmitButton";
import { MdLockReset } from "react-icons/md";

const ResetPassword = () => {

    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(resetPasswordInitialState, resetPasswordValidationSchema, async (values) => {
        await handleResponse(resetPassword(values.password, token), formik.resetForm, "/login");
    });

    return <>
        <form
            onSubmit={formik.handleSubmit}
            className="flex mx-auto flex-col mt-6 lg:w-9/12 lg:mx-auto"
        >
            <FormMotion delay={0.4}>
                <FormInputPassword
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder="Enter New Password"
                    description="Create a strong password with at least 6 characters, including uppercase and lowercase letters, numbers, and special characters."
                />
                {formik.touched.password && formik.errors.password && (
                    <NestErrors title={formik.errors.password} color='warning' />
                )}
            </FormMotion>
            <FormMotion delay={0.5}>
                <FormInputPassword
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    placeholder="Confirm New Password"
                    description="Re-enter your password to confirm. Ensure it matches the password entered above."
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <NestErrors title={formik.errors.confirmPassword} color='warning' />
                )}
            </FormMotion>
            <FormMotion delay={0.6}>
                <SubmitButton
                    title="Send"
                    isDisabled={formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                    startContent={<MdLockReset />}
                    className="mt-3"
                />
            </FormMotion>
        </form>
    </>;
};

export default ResetPassword;