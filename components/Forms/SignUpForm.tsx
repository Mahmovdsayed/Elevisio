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
import { useState } from 'react';
import { AddToast } from '@/functions/AddToast';
import { ConfettiFireworks } from '@/functions/ConfettiFireworks';
import { useRouter } from 'next/navigation';
import { compressImage } from '@/functions/compressImage';

const SignUpForm = () => {
    const [Loading, setLoading] = useState(false)
    const [value, setValue] = useState(0);
    const [uploading, setUploading] = useState(false);

    const router = useRouter()

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setValue(0);

        try {
            const compressedImage = await compressImage(file);
            if (!compressedImage) throw new Error("Failed to compress image");


            const compressedFile = new File([compressedImage], file.name, { type: file.type });

            formik.setFieldValue("image", compressedFile);

            let progress = 0;
            const uploadInterval = setInterval(() => {
                progress += 10;
                setValue(progress);

                if (progress >= 100) {
                    clearInterval(uploadInterval);
                    setTimeout(() => {
                        setUploading(false);
                        setValue(0);
                    }, 500);
                }
            }, 300);
        } catch (error) {
            console.error("Image upload error:");
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
            setUploading(false);
        }
    };


    const formik = useFormHandler(SignUpInitialState, signUpValidationSchema, async (values) => {
        setLoading(true)
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else {
                    formData.append(key, value as string);
                }
            }
        });

        const response = await signUpUser(formData);
        if (response.success) {
            formik.resetForm()
            setLoading(false)
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
            setLoading(false)
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
                {/* First Name */}
                <FormMotion delay={0.3}>
                    <FormInput
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Enter your first name as it appears on official documents."
                        placeholder="Enter Your First Name"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <NestErrors title={formik.errors.firstName} color='warning' />
                    )}
                </FormMotion>
                {/* Last Name */}
                <FormMotion delay={0.4}>
                    <FormInput
                        name="secondName"
                        label="Last Name"
                        value={formik.values.secondName}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Enter your last name as it appears on official documents."
                        placeholder="Enter Your Last Name"
                    />
                    {formik.touched.secondName && formik.errors.secondName && (
                        <NestErrors title={formik.errors.secondName} color='warning' />
                    )}
                </FormMotion>
                {/* User Name */}
                <FormMotion delay={0.5}>
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
                <FormMotion delay={0.6}>
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
                <FormMotion delay={0.7}>
                    <FormInputPassword
                        name='password'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder='Enter Your Password'
                    />
                    {formik.touched.password && formik.errors.password && (
                        <NestErrors title={formik.errors.password} color='warning' />
                    )}
                </FormMotion>
                {/* Image */}
                <FormMotion delay={0.8}>
                    <FormInput
                        description="Upload your profile picture. This helps us to know more about you."
                        label='Image'
                        type='file'
                        name='image'
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        placeholder="Upload Your Image"
                        accept={true}
                    />
                    {uploading && (
                        <Progress
                            aria-label="Uploading..."
                            className="w-full mb-3"
                            color="success"
                            showValueLabel={true}
                            size="sm"
                            value={value}
                        />
                    )}
                    {formik.touched.image && formik.errors.image && (
                        <NestErrors title={formik.errors.image} color='warning' />
                    )}

                </FormMotion>
                {/* Submit Button */}
                <FormMotion delay={0.9}>
                    <Button
                        isLoading={Loading}
                        isDisabled={formik.isSubmitting || Loading}
                        type="submit"
                        radius="md"
                        size="md"
                        variant="solid"
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
