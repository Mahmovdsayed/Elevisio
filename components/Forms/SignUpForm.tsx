'use client';

import { signUpValidationSchema } from '@/Validation/SignUpValidation';
import { signUpUser } from '@/app/actions/signup.action';
import useFormHandler from '@/hooks/useFormHandler';
import { SignUpInitialState } from '@/services/InitialState';
import NestErrors from '../Ui/NestErrors';
import FormMotion from '../motion/FormMotion';
import FormInput from '../Ui/FormInput';
import FormInputPassword from '../Ui/FormInputPassword';
import { Button, Checkbox, Link, Progress } from '@heroui/react';
import { IoLogIn } from 'react-icons/io5';
import { AddToast } from '@/functions/AddToast';
import { ConfettiFireworks } from '@/functions/ConfettiFireworks';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {
    const router = useRouter()


    const formik = useFormHandler(SignUpInitialState, signUpValidationSchema, async (values) => {
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as string);
            }
        });

        const response = await signUpUser(formData);
        if (response.success) {
            formik.resetForm()
            AddToast(
                "User created successfully!",
                5000,
                "success",
                "Please check your email to verify your account."
            );
            ConfettiFireworks();
            setTimeout(() => {
                router.push(`/verify?email=${values.email}`);
            }, 2000);
        } else {
            AddToast(
                response.message || "Failed to create user.",
                5000,
                "warning"
            );
        }
    });

    return (
        <div className="pt-5 lg:w-9/12 lg:mx-auto">
            <form
                className="flex flex-col gap-2"
                onSubmit={formik.handleSubmit}
            >
                {/* User Name */}
                <FormMotion delay={0.4}>
                    <FormInput
                        name="userName"
                        label="User Name"
                        value={formik.values.userName}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Choose a unique username that represents you. This will be your public identity."
                        placeholder="Enter Your Username"
                    />
                    {formik.touched.userName && formik.errors.userName && (
                        <NestErrors title={formik.errors.userName} color='warning' />
                    )}
                </FormMotion>
                {/* Email */}
                <FormMotion delay={0.5}>
                    <FormInput
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Enter a valid email address. This will be used for account verification and communication."
                        placeholder="Enter Your Email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <NestErrors title={formik.errors.email} color='warning' />
                    )}
                </FormMotion>
                {/* Password */}
                <FormMotion delay={0.6}>
                    <FormInputPassword
                        name='password'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        description="Create a strong password with at least 6 characters, including uppercase, lowercase, and numbers."
                        placeholder='Enter Your Password'
                    />
                    {formik.touched.password && formik.errors.password && (
                        <NestErrors title={formik.errors.password} color='warning' />
                    )}
                </FormMotion>
                {/* Submit Button */}
                <FormMotion delay={0.7}>
                    <Button
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        type="submit"
                        radius="md"
                        size="md"
                        variant="flat"
                        startContent={<IoLogIn />}
                        className="w-full">
                        Sign Up
                    </Button>
                </FormMotion>
            </form>
        </div>

    );
};

export default SignUpForm;
