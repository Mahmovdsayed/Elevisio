'use client'

import { colors } from "@/types/colors.types";
import { Button, Divider, Image } from "@heroui/react";
import React, { useState } from "react";
import DashBoardModal from "./DashBoardModal";
import FormMotion from "../motion/FormMotion";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";
import { compressImage } from "@/functions/compressImage";
import { AddToast } from "@/functions/AddToast";
import useHandleResponse from "@/hooks/useHandleResponse";
import useFormHandler from "@/hooks/useFormHandler";
import { imageUploadInitialState } from "@/services/InitialState";
import { uploadImageValidationSchema } from "@/Validation/imageValidation";
import { userMainImage } from "@/app/actions/images/userImage.action";
import NestErrors from "./NestErrors";


interface IProps {
    startContent?: React.ReactNode
    className?: string
    title: string
    size?: "sm" | "md" | "lg"
    color?: colors
    onPress?: () => void
    isLoading?: boolean
    isDisabled?: boolean
    radius?: "sm" | "md" | "lg" | "full"
    imageURL: string
    folderName: string
}
const UploadImage = ({
    startContent,
    className,
    title,
    size = "md",
    color = "default",
    isLoading,
    isDisabled,
    imageURL,
    radius = "md",
    folderName
}: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file);
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("image", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };
    const formik = useFormHandler(imageUploadInitialState, uploadImageValidationSchema, async (values) => {
        const formData = new FormData();
        if (values.image instanceof File) {
            formData.append("image", values.image);
        }

        await handleResponse(userMainImage(formData, folderName), formik.resetForm)
        handleCloseModal()
    });

    return (
        <>
            <Button
                variant="flat"
                color={color}
                size={size}
                radius={radius}
                className={className}
                startContent={startContent}
                onPress={handleOpenModal}
                isDisabled={isDisabled}
                isLoading={isLoading}
            >
                {title}
            </Button>

            <DashBoardModal
                title="Upload Image"
                description="Upload your image here, you can upload only image files or gif files. Max size 5MB"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <Divider />
                <FormMotion delay={0.3}>
                    <div className="flex flex-col items-center justify-center my-4 w-full">
                        <Image
                            src={imageURL}
                            className="w-36 h-36 object-cover object-center"
                            isZoomed
                            alt="User Avatar"
                        />
                    </div>
                </FormMotion>
                <form
                    className="w-full"
                    onSubmit={formik.handleSubmit}
                >
                    <FormMotion delay={0.4}>
                        <FormInput
                            type="file"
                            description="Upload your profile picture. This helps us to know more about you."
                            label='Image'
                            name='image'
                            accept={true}
                            placeholder="Upload Your Image"
                            onBlur={formik.handleBlur}
                            onChange={handleImageChange}
                            size="sm"
                            variant="flat"
                        />
                        {typeof formik.errors.image === "string" ? (
                            <NestErrors color="warning" title={formik.errors.image} />
                        ) : null}
                    </FormMotion>
                    <FormMotion delay={0.5}>
                        <SubmitButton
                            isDisabled={formik.isSubmitting}
                            isLoading={formik.isSubmitting}
                            title="Upload"
                            className="mt-3"
                            startContent={startContent}
                        />
                    </FormMotion>
                </form>

            </DashBoardModal>
        </>
    );
};

export default UploadImage;