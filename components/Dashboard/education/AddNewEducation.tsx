'use client'
import { addNewEducation } from "@/app/actions/education/addEducation.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import SubmitButton from "@/components/Ui/SubmitButton";
import { AddToast } from "@/functions/AddToast";
import { compressImage } from "@/functions/compressImage";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { addNewEducationInitialState } from "@/services/InitialState";
import { educationSchema } from "@/Validation/educationValidation";
import { Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { PiStudentDuotone } from "react-icons/pi";


const AddNewEducation = () => {
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

            formik.setFieldValue("schoolImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(addNewEducationInitialState, educationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("schoolName", values.schoolName);
        formData.append("faculty", values.faculty);
        formData.append("status", values.status);
        formData.append("gpa", values.gpa as any);
        formData.append("location", values.location);
        formData.append("from", values.from);
        formData.append("to", values.to);
        if (values.description) {
            formData.append("description", values.description);
        }
        formData.append("certificateURL", values.certificateURL);
        if (values.schoolImage instanceof File) { formData.append("schoolImage", values.schoolImage); }

        await handleResponse(addNewEducation(formData), formik.resetForm)
        handleCloseModal()



    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Add Education"
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
            title="Add New Education"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Add New Education"
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Enter your school name, faculty, status, and duration of study. You can also add your GPA, location, certificate URL, and a brief description of your academic experience."
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
                            value={formik.values.gpa || ""}
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
                            value={formik.values.to}
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
                        type="file"
                        isRequired={false}
                        label="Upload School Logo"
                        name="schoolImage"
                        accept
                        placeholder="Upload School Logo"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        variant="flat"
                        size="sm"
                        // description="(Optional) Upload your school logo."
                    />
                    {formik.touched.schoolImage && formik.errors.schoolImage && (
                        <NestErrors title={formik.errors.schoolImage} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={1.1}>
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

export default AddNewEducation;
