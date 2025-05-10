'use client'

import { updateCertificate } from "@/app/actions/certificate/updateCertificate.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Certificate } from "@/types/certificate.types";
import { updateCertificateValidationSchema } from "@/Validation/certificateValidation";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface IProps {
    id: string;
    data: Certificate;
}
const UpdateCertificate = ({ id, data }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        title: data.title || "",
        date: data.date || "",
        certificateURL: data.certificateURL || ""
    } as Certificate

    const formik = useFormHandler(initialValues, updateCertificateValidationSchema, async (values) => {
        const formData = new FormData();
        formData.append("certificateId", id);
        formData.append("title", values.title);
        formData.append("date", values.date);
        formData.append("certificateURL", values.certificateURL);
        await handleResponse(updateCertificate(formData));
        handleCloseModal();

    })

    return <>
        <AddNewOrUpdateButton
            title="Update"
            className="w-full font-medium"
            variant="faded"
            onPress={handleOpenModal}
            color="primary"
            startContent={<FaEdit />}
            radius="md"
            size="md"
        />
        <DashBoardModal
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            submitButtonText="Update Certificate"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update Certificate"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update your certificate title, date, and certificate URL."
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
            </form>
        </DashBoardModal >

    </>;
};

export default UpdateCertificate;