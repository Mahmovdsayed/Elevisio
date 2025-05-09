'use client'

import { addCertificate } from "@/app/actions/certificate/addCertificate.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import NestErrors from "@/components/Ui/NestErrors";
import { AddToast } from "@/functions/AddToast";
import { compressImage } from "@/functions/compressImage";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { certificateInitialState } from "@/services/InitialState";
import { certificateValidationSchema } from "@/Validation/certificateValidation";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";


const AddNewCertificate = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "banner");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("certificateImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(certificateInitialState, certificateValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("date", values.date);
        formData.append("certificateURL", values.certificateURL);
        if (values.certificateImage instanceof File) { formData.append("certificateImage", values.certificateImage); }

        await handleResponse(addCertificate(formData), formik.resetForm)
        handleCloseModal()

    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Add Certificate"
                className="w-full lg:w-fit font-medium"
                variant="bordered"
                color="default"
                startContent={<IoMdAdd />}
                radius="full"
                size="md"
                onPress={handleOpenModal}
            />
        </motion.div >


        <DashBoardModal
            title="Add New Certificate"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Add New Certificate"
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Enter your certificate title, date, and certificate URL. You can also add your certificate image."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">

                <FormMotion delay={0.2}>
                    <FormInput
                        name="title"
                        label="Certificate Title"
                        placeholder="Certificate Title"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <NestErrors title={formik.errors.title} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <DatePickerFieldNest
                        isRequired={true}
                        label="Certificate Date"
                        name="date"
                        onChange={(value) => formik.setFieldValue("date", value)}
                        onBlur={() => formik.handleBlur("date")}
                        value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date && (
                        <NestErrors title={formik.errors.date} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.4}>
                    <FormInput
                        name="certificateURL"
                        label="Certificate URL"
                        placeholder="Certificate URL"
                        variant="flat"
                        size="sm"
                        description="Enter your certificate URL from Google Drive."
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.certificateURL}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.certificateURL && formik.errors.certificateURL && (
                        <NestErrors title={formik.errors.certificateURL} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.5}>
                    <FormInput
                        type="file"
                        isRequired={true}
                        label="Upload Certificate Image"
                        name="certificateImage"
                        accept
                        placeholder="Upload Certificate Image"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        variant="flat"
                        description="For best results, please upload image (1920x1080 pixels). Supported formats: PNG, JPEG, JPG."
                        size="sm"
                    />
                    {formik.touched.certificateImage && formik.errors.certificateImage && (
                        <NestErrors title={formik.errors.certificateImage} color='warning' />
                    )}
                </FormMotion>
            </form>
        </DashBoardModal>

    </>;
};

export default AddNewCertificate;