"use client"

import { updateCV } from "@/app/actions/cv/updateCV.action"
import useFormHandler from "@/hooks/useFormHandler"
import useHandleResponse from "@/hooks/useHandleResponse"
import { CV } from "@/types/cv.types"
import { cvValidationSchema } from "@/Validation/cvValidation"
import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import AddNewOrUpdateButton from "../Ui/AddNewOrUpdateButton"
import DashBoardModal from "../Ui/DashBoardModal"
import { IoMdAdd } from "react-icons/io"
import { Checkbox } from "@heroui/react"
import NestErrors from "../Ui/NestErrors"
import FormMotion from "../motion/FormMotion"
import FormInput from "../Ui/FormInput"
interface IProps {
    id: string
    data: CV
}

const UpdateCV = ({ id, data }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        name: data.name,
        isMainCV: data.isMainCV,
    };

    const formik = useFormHandler(initialValues, cvValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("cvId", id);
        formData.append("name", values.name);
        formData.append('isMainCV', values.isMainCV ? 'true' : 'false');
        await handleResponse(updateCV(formData));
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
            submitButtonText="Update CV"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update CV"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update the CV details"
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
                        isSelected={formik.values.isMainCV as any}
                        checked={formik.values.isMainCV as any}
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
            </form>
        </DashBoardModal>
    </>

}

export default UpdateCV;