'use client'
import { updateEducation } from "@/app/actions/education/updateEducation.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Education } from "@/types/education.types";
import { educationSchema } from "@/Validation/educationValidation";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FaEdit, FaGraduationCap } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { PiStudentDuotone } from "react-icons/pi";

interface IProps {
    id: string
    data: Education
}
const UpdateEducation = ({ id, data }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        schoolName: data.schoolName || "",
        faculty: data.faculty || "",
        status: data.status || "",
        description: data.description || "",
        from: data.from || "",
        to: data.to || "",
        gpa: data.gpa,
        location: data.location || "",
        certificateURL: data.certificateURL || ""
    } as Education;

    const formik = useFormHandler(initialValues, educationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("educationId", id);
        formData.append("schoolName", values.schoolName);
        formData.append("faculty", values.faculty);
        formData.append("status", values.status);
        formData.append("gpa", values.gpa as any);
        formData.append("location", values.location);
        formData.append("from", values.from);
        formData.append("to", values.to as any);
        if (values.description) {
            formData.append("description", values.description);
        }
        formData.append("certificateURL", values.certificateURL);
        await handleResponse(updateEducation(formData));
        handleCloseModal();

    });

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
            submitButtonText="Update Education"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update Education"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update your school name, faculty, status, and duration of study. You can also update your GPA, location, certificate URL, and a brief description of your academic experience."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                <FormMotion delay={0.2}>
                    <FormInput
                        name="schoolName"
                        label="School Name"
                        placeholder="Enter School Name"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.schoolName}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.schoolName && formik.errors.schoolName && (
                        <NestErrors title={formik.errors.schoolName} color='warning' />
                    )}
                </FormMotion>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.3}>
                        <FormInput
                            name="faculty"
                            label="Faculty"
                            placeholder="Enter Faculty"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.faculty}
                            type="text"
                            isRequired={true}
                        />
                        {formik.touched.faculty && formik.errors.faculty && (
                            <NestErrors title={formik.errors.faculty} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.4}>
                        <Select
                            selectedKeys={[formik.values.status || ""]}
                            placeholder="Select Status"
                            isRequired
                            label="Status"
                            size="sm"
                            radius="md"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            className="w-full mb-1"
                            labelPlacement="inside"
                            name="status"
                        >
                            <SelectItem key={"Currently Studying"} id="Currently Studying" startContent={<PiStudentDuotone />}>Currently Studying</SelectItem>
                            <SelectItem key={"Graduated"} id="Graduated" startContent={<FaGraduationCap />}>Graduated</SelectItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                            <NestErrors title={formik.errors.status} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.5}>
                        <FormInput
                            name="gpa"
                            label="GPA"
                            placeholder="Enter GPA"
                            // description="(Optional) Enter your GPA (0-4)"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            defaultValue={formik.values.gpa as any}
                            value={formik.values.gpa as any}
                            type="text"
                            isRequired={false}
                        />
                        {formik.touched.gpa && formik.errors.gpa && (
                            <NestErrors title={formik.errors.gpa} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.6}>
                        <FormInput
                            name="location"
                            label="Location"
                            placeholder="Enter Location"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.location}
                            type="text"
                            isRequired={false}
                        // description="Enter the country where your university is located (e.g., Egypt, USA, Canada)."
                        />
                        {formik.touched.location && formik.errors.location && (
                            <NestErrors title={formik.errors.location} color='warning' />
                        )}
                    </FormMotion>
                </div>


                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.7}>
                        <DatePickerFieldNest
                            isRequired={true}
                            label="Start Date"
                            name="from"
                            onChange={(value) => formik.setFieldValue("from", value)}
                            onBlur={() => formik.handleBlur("from")}
                            value={formik.values.from}
                        />
                        {formik.touched.from && formik.errors.from && (
                            <NestErrors title={formik.errors.from} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.8}>
                        <DatePickerFieldNest
                            label="End Date"
                            name="to"
                            onChange={(value) => formik.setFieldValue("to", value)}
                            onBlur={() => formik.handleBlur("to")}
                            value={formik.values.to as any}
                            isDisabled={formik.values.status === "Currently Studying"}
                        />
                        {formik.touched.to && formik.errors.to && (
                            <NestErrors title={formik.errors.to} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <FormMotion delay={0.9}>
                    <FormTextArea
                        name="description"
                        label="Description"
                        placeholder="Enter Description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description || ""}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <NestErrors title={formik.errors.description} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={1}>
                    <FormInput
                        name="certificateURL"
                        label="Certificate URL"
                        placeholder="Enter Certificate URL"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.certificateURL}
                        type="text"
                        isRequired={false}
                        description="(Optional) Enter your certificate URL from Google Drive."
                    />
                    {formik.touched.certificateURL && formik.errors.certificateURL && (
                        <NestErrors title={formik.errors.certificateURL} color='warning' />
                    )}
                </FormMotion>
            </form>
        </DashBoardModal >
    </>;
};

export default UpdateEducation;
