'use client'

import useFormHandler from "@/hooks/useFormHandler";
import FormMotion from "../motion/FormMotion";
import FormInput from "../Ui/FormInput";
import FormInputPassword from "../Ui/FormInputPassword";
import { LoginInitialState } from "@/services/InitialState";
import { signInValidationSchema } from "@/Validation/LoginValidation";
import NestErrors from "../Ui/NestErrors";
import { Button } from "@heroui/react";
import { IoLogIn } from "react-icons/io5";
import { signInUser } from "@/app/actions/signin.action";
import { useRouter } from "next/navigation";
import { AddToast } from "@/functions/AddToast";

const LogInForm = () => {
    const router = useRouter()

    const formik = useFormHandler(LoginInitialState, signInValidationSchema, async (values) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as string);
            }
        });
        const response = await signInUser(formData);
        if (response.success) {
            formik.resetForm()
            AddToast(
                response.message,
                5000,
                "success",
            );
            router.push(`/`);

        } else {
            AddToast(
                response.message || "Failed to Login",
                5000,
                "warning"
            );
        }
    })
    return <>
        <div>
            <form
                onSubmit={formik.handleSubmit}
                className="flex mx-auto flex-col gap-6 mt-6 lg:w-9/12 lg:mx-auto">
                <FormMotion delay={0.4}>
                    <FormInput
                        name="email"
                        type="email"
                        placeholder="Enter your Email"
                        label="Email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <NestErrors title={formik.errors.email} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.5}>
                    <FormInputPassword
                        name="password"
                        placeholder="Enter your Password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <NestErrors title={formik.errors.password} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.6}>
                    <Button
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        type="submit"
                        radius="md"
                        size="md"
                        variant="flat"
                        startContent={<IoLogIn />}
                        className="w-full"
                    >
                        Log in
                    </Button>
                </FormMotion>
            </form>
        </div>
    </>;
};

export default LogInForm;