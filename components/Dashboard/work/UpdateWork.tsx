'use client'
import { updateUserWork } from "@/app/actions/work/work.action";
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
import { allowedImageTypes, employmentType } from "@/static/constant";
import { WorkExperience } from "@/types/work.type";
import { updateWorkSchema } from "@/Validation/workValidations";
import { Button, Checkbox, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface IProps {
    id: string
    data: WorkExperience
}
const UpdateWork = ({ id, data }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();


    const initialValues = {
        companyName: data.companyName || "",
        positionName: data.positionName || "",
        employmentType: data.employmentType || "",
        description: data.description || "",
        companyImage: data.companyImage || null,
        from: data.from || "",
        to: data.to || "",
        current: data.current ?? false
    } as WorkExperience;

    const formik = useFormHandler(initialValues, updateWorkSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("workID", id);
        formData.append("companyName", values.companyName);
        formData.append("positionName", values.positionName);
        formData.append("employmentType", values.employmentType);
        if (values.description) {
            formData.append("description", values.description);
        }
        formData.append("from", values.from);
        if (values.to) {
            formData.append("to", values.to);
        }
        formData.append("current", values.current ? "true" : "false");

        if (values.companyImage instanceof File) {
            formData.append("companyImage", values.companyImage);
        } else if (values.companyImage && typeof values.companyImage === 'object') {
            formData.append("existingImage", JSON.stringify(values.companyImage));
        } else {
            formData.append("removeImage", "true");
        }

        await handleResponse(updateUserWork(formData));
        handleCloseModal();
    });


    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            formik.setFieldValue("companyImage", null);
            return;
        }

        if (!allowedImageTypes.includes(file.type)) {
            AddToast("Invalid file type. Only PNG, JPEG, JPG, and GIF are allowed.", 5000, "danger");
            return;
        }

        try {
            const compressedImage = await compressImage(file);
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([compressedImage], file.name, { type: file.type });

            formik.setFieldValue("companyImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };




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
            submitButtonText="Update Work"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update Work Experience"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update your company name, position, employment type, and work duration. Mark 'Current' if you're still in this role. You can also update a company logo and add a brief description."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                <FormMotion delay={0.2}>
                    <FormInput
                        name="companyName"
                        label="Company Name"
                        placeholder="Enter Company Name"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.companyName}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.companyName && formik.errors.companyName && (
                        <NestErrors title={formik.errors.companyName} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <FormInput
                        name="positionName"
                        label="Position Name"
                        placeholder="Enter Position Name"
                        size="sm"
                        variant="flat"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.positionName}
                        type="text"
                        isRequired={true}
                    />
                    {formik.touched.positionName && formik.errors.positionName && (
                        <NestErrors title={formik.errors.positionName} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.4}>
                    <Select
                        placeholder="Select your Employment Type"
                        isRequired={true}
                        selectedKeys={[formik.values.employmentType || ""]}
                        label="Employment Type"
                        name="employmentType"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.employmentType}
                        className="w-full mb-1"
                        radius="md"
                        size="sm"
                        variant="flat"
                        color="default"
                        labelPlacement="inside"
                    >
                        {employmentType.map((e: any) =>
                            <SelectItem key={e.key} id={e.key}>
                                {e.label}
                            </SelectItem>
                        )}


                    </Select>
                    {formik.touched.employmentType && formik.errors.employmentType && (
                        <NestErrors title={formik.errors.employmentType} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.5}>
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
                <FormMotion delay={0.6}>
                    <FormInput
                        type="file"
                        isRequired={false}
                        label="Upload New Company Logo"
                        name="companyImage"
                        accept
                        placeholder="Upload New Company Logo"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        variant="flat"
                        size="sm"
                    />
                    {formik.touched.companyImage && typeof formik.errors.companyImage === 'string' && (
                        <NestErrors title={formik.errors.companyImage} color="warning" />
                    )}

                </FormMotion>
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
                            value={formik.values.to || undefined}
                            isDisabled={formik.values.current}
                        />
                        {formik.touched.to && formik.errors.to && (
                            <NestErrors title={formik.errors.to} color='warning' />
                        )}
                    </FormMotion>

                </div>
                <FormMotion delay={0.9}>
                    <Checkbox
                        color="primary"
                        size="sm"
                        className="mb-1 px-4"
                        name="current"
                        isSelected={formik.values.current}
                        checked={formik.values.current}
                        onBlur={formik.handleBlur}
                        onChange={(isChecked) => {
                            formik.setFieldValue("current", isChecked.target.checked);
                            if (isChecked) {
                                formik.setFieldValue("to", null);
                            }
                        }}
                    >
                        I am currently employed here
                    </Checkbox>

                    {formik.touched.current && formik.errors.current && (
                        <NestErrors title={formik.errors.current} color='warning' />
                    )}
                </FormMotion>
            </form>
        </DashBoardModal>



    </>;
};

export default UpdateWork;