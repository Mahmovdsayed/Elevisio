'use client'

import { uploadCV } from "@/app/actions/cv/addCV.action";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { cvInitialState } from "@/services/InitialState";
import { cvValidationSchema } from "@/Validation/cvValidation";
import { motion } from "framer-motion";
import { useState } from "react";
import AddNewOrUpdateButton from "../Ui/AddNewOrUpdateButton";
import { FaUpload } from "react-icons/fa";
import DashBoardModal from "../Ui/DashBoardModal";
import FormMotion from "../motion/FormMotion";
import FormInput from "../Ui/FormInput";
import NestErrors from "../Ui/NestErrors";
import { Checkbox } from "@heroui/react";

const AddNewCV = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(cvInitialState, cvValidationSchema, async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('isMainCV', values.isMainCV ? 'true' : 'false');
        if (values.CV instanceof File) { formData.append("CV", values.CV); }

        await handleResponse(uploadCV(formData), formik.resetForm)
        handleCloseModal();

    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Upload CV"
                className="w-full lg:w-fit font-medium"
                variant="bordered"
                color="default"
                startContent={<FaUpload />}
                radius="full"
                size="md"
                onPress={handleOpenModal}
            />
        </motion.div >

        <DashBoardModal
            title="Upload New CV"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Upload Now"
            startContent={<FaUpload />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Please fill out the form below to upload your CV."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                <FormMotion delay={0.2}>
                    <FormInput
                        name="name"
                        label="CV Title"
                        placeholder="Enter CV Title"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <NestErrors title={formik.errors.name} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <Checkbox
                        color="primary"
                        size="sm"
                        className="mb-1 px-4"
                        name="isMainCV"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            formik.setFieldValue("isMainCV", e.target.checked);
                        }}
                        value={formik.values.isMainCV as any}
                    >
                        Make this my primary CV
                    </Checkbox>
                    {formik.touched.isMainCV && formik.errors.isMainCV && (
                        <NestErrors title={formik.errors.isMainCV} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.4}>
                    <FormInput
                        type="file"
                        isRequired={false}
                        label="Upload CV"
                        name="CV"
                        accept
                        placeholder="Upload CV"
                        onBlur={formik.handleBlur}
                        onChange={(event) => {
                            const file = event.currentTarget.files?.[0];
                            formik.setFieldValue("CV", file);
                        }
                        }
                        variant="flat"
                        size="sm"
                    />
                    {formik.touched.CV && formik.errors.CV && (
                        <NestErrors title={formik.errors.CV} color='warning' />
                    )}
                </FormMotion>
            </form>
        </DashBoardModal>
    </>;
};
export default AddNewCV;
