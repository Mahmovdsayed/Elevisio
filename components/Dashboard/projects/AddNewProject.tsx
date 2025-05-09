'use client'

import { addProject } from "@/app/actions/projects/addProjects.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import { AddToast } from "@/functions/AddToast";
import { compressImage } from "@/functions/compressImage";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { projectInitialState } from "@/services/InitialState";
import { addProjectValidationSchema } from "@/Validation/projectValidations";
import { Chip, Divider, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";


const AddNewProject = () => {
    const [currentTech, setCurrentTech] = useState('');
    const [currentTool, setCurrentTool] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const handleTechKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTech.trim()) {
            e.preventDefault();
            const newTechStack = [...formik.values.techStack, currentTech.trim()];
            formik.setFieldValue('techStack', newTechStack);
            setCurrentTech('');
        }
    };
    const removeTech = (index: number) => {
        const newTechStack = formik.values.techStack.filter((_, i) => i !== index);
        formik.setFieldValue('techStack', newTechStack);
    };
    const handleToolKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTool.trim()) {
            e.preventDefault();
            const newToolStack = [...formik.values.designTools, currentTool.trim()];
            formik.setFieldValue('designTools', newToolStack);
            setCurrentTool('');
        }
    };
    const removeTool = (index: number) => {
        const newToolStack = formik.values.designTools.filter((_, i) => i !== index);
        formik.setFieldValue('designTools', newToolStack);
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "banner");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("projectImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(projectInitialState, addProjectValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("clientName", values.clientName);
        formData.append("projectType", values.projectType);
        formData.append("status", values.status);
        formData.append("projectURL", values.projectURL);
        formData.append("githubURL", values.githubURL);
        formData.append("designFileURL", values.designFileURL);
        formData.append("techStack", JSON.stringify(values.techStack));
        formData.append("designTools", JSON.stringify(values.designTools));
        formData.append("from", values.from);
        formData.append("to", values.to);
        if (values.projectImage instanceof File) { formData.append("projectImage", values.projectImage); }

        await handleResponse(addProject(formData), formik.resetForm)
        handleCloseModal()





    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Add Project"
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
            title="Add New Project"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Add New Project"
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Enter your project name, description, and duration. You can also add your project URL, GitHub URL, and a brief description of your project experience."
        >
            <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
                <FormMotion delay={0.2}>
                    <FormInput
                        name="name"
                        label="Project Name"
                        placeholder="Enter Project Name"
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
                    <FormTextArea
                        name="description"
                        label="Description"
                        placeholder="Enter Project Description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description || ""}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <NestErrors title={formik.errors.description} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.4}>
                    <FormInput
                        name="clientName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.clientName}
                        type="text"
                        label="Client Name"
                        placeholder="Enter Client Name"
                        size="sm"
                        variant="flat"
                        isRequired={true}
                    />
                    {formik.touched.clientName && formik.errors.clientName && (
                        <NestErrors title={formik.errors.clientName} color='warning' />
                    )}
                </FormMotion>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.5}>
                        <Select
                            placeholder="Select Project Type"
                            isRequired
                            label="Project Type"
                            size="sm"
                            radius="md"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.projectType}
                            className="w-full mb-1"
                            labelPlacement="inside"
                            name="projectType"
                        >
                            <SelectItem key={"Tech"} id={"Tech"}>Tech</SelectItem>
                            <SelectItem key={"Design"} id={"Design"}>Design</SelectItem>
                            <SelectItem key={"Marketing"} id={"Marketing"}>Marketing</SelectItem>
                            <SelectItem key={"Business"} id={"Business"}>Business</SelectItem>
                            <SelectItem key={"Creative"} id={"Creative"}>Creative</SelectItem>
                            <SelectItem key={"Other"} id={"Other"}>Other</SelectItem>
                        </Select>
                        {formik.touched.projectType && formik.errors.projectType && (
                            <NestErrors title={formik.errors.projectType} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.6}>
                        <Select
                            placeholder="Select Project Status"
                            isRequired
                            label="Project Status"
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
                            <SelectItem key={"Planned"} id={"Planned"}>Planned</SelectItem>
                            <SelectItem key={"In-Progress"} id={"In-Progress"}>In-Progress</SelectItem>
                            <SelectItem key={"Completed"} id={"Completed"}>Completed</SelectItem>
                            <SelectItem key={"On-Hold"} id={"On-Hold"}>On-Hold</SelectItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                            <NestErrors title={formik.errors.status} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.7}>
                        <FormInput
                            name="projectURL"
                            label="Project URL"
                            description="Enter your project URL from your website or Behance."
                            placeholder="Enter Project URL"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.projectURL}
                            type="text"
                            isRequired={true}
                        />
                        {formik.touched.projectURL && formik.errors.projectURL && (
                            <NestErrors title={formik.errors.projectURL} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.8}>
                        <FormInput
                            name="githubURL"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            description="(Optional) Enter your GitHub URL from your repository."
                            value={formik.values.githubURL}
                            type="text"
                            label="GitHub URL"
                            placeholder="Enter GitHub URL"
                            size="sm"
                            variant="flat"
                            isRequired={false}
                        />
                        {formik.touched.githubURL && formik.errors.githubURL && (
                            <NestErrors title={formik.errors.githubURL} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.9}>
                        <FormInput
                            name="designFileURL"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.designFileURL}
                            description="(Optional) Enter your design file URL from Google Drive or Figma."
                            type="text"
                            label="Design File URL"
                            placeholder="Enter Design File URL"
                            size="sm"
                            variant="flat"
                            isRequired={false}
                        />
                        {formik.touched.designFileURL && formik.errors.designFileURL && (
                            <NestErrors title={formik.errors.designFileURL} color='warning' />
                        )}
                    </FormMotion>

                </div>

                <FormMotion delay={1}>
                    <div className="flex flex-col gap-2">
                        <FormInput
                            type="text"
                            onBlur={formik.handleBlur}
                            name="techStack"
                            isRequired={false}
                            label="Tech Stack"
                            placeholder="Add technology and press Enter"
                            value={currentTech}
                            onChange={(e) => setCurrentTech(e.target.value)}
                            onKeyDown={handleTechKeyPress}
                            description="(Optional) Add your tech stack here. For example: React, Next.js, Node.js, etc."
                            size="sm"
                            variant="flat"
                        />

                        <div className="flex flex-wrap gap-2 mb-1">
                            {formik.values.techStack.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}

                                >
                                    <Chip color="primary" isCloseable onClose={() => removeTech(index)} size="md" radius="md" variant="flat">{tech}</Chip>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FormMotion>
                <FormMotion delay={1.1}>
                    <div className="flex flex-col gap-2">
                        <FormInput
                            type="text"
                            onBlur={formik.handleBlur}
                            name="designTools"
                            isRequired={false}
                            label="Design Tools"
                            placeholder="Add Tools and press Enter"
                            description="(Optional) Add your design tools here. For example: Figma, Adobe XD, Photoshop, etc."
                            value={currentTool}
                            onChange={(e) => setCurrentTool(e.target.value)}
                            onKeyDown={handleToolKeyPress}
                            size="sm"
                            variant="flat"
                        />

                        <div className="flex flex-wrap gap-2 mb-1">
                            {formik.values.designTools.map((tool, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}

                                >
                                    <Chip color="primary" isCloseable onClose={() => removeTool(index)} size="md" radius="md" variant="flat">{tool}</Chip>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FormMotion>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={1.2}>
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
                    <FormMotion delay={1.3}>
                        <DatePickerFieldNest
                            label="End Date"
                            name="to"
                            onChange={(value) => formik.setFieldValue("to", value)}
                            onBlur={() => formik.handleBlur("to")}
                            value={formik.values.to}
                            isDisabled={formik.values.status === "In-Progress" || formik.values.status === "Planned" || formik.values.status === "On-Hold"}
                        />
                        {formik.touched.to && formik.errors.to && (
                            <NestErrors title={formik.errors.to} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <FormMotion delay={1.4}>
                    <FormInput
                        type="file"
                        isRequired={false}
                        label="Upload Project Image"
                        name="projectImage"
                        accept
                        placeholder="Upload Project Image"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        variant="flat"
                        description="For best results, please upload a image (1920x1080 pixels). Supported formats: PNG, JPEG, JPG."
                        size="sm"
                    />
                    {formik.touched.projectImage && formik.errors.projectImage && (
                        <NestErrors title={formik.errors.projectImage} color='warning' />
                    )}
                </FormMotion>
            </form>
        </DashBoardModal >

    </>;
};

export default AddNewProject;