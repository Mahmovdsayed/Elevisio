'use client';

import { updateProjcets } from '@/app/actions/projects/updateProject.action';
import FormMotion from '@/components/motion/FormMotion';
import AddNewOrUpdateButton from '@/components/Ui/AddNewOrUpdateButton';
import DashBoardModal from '@/components/Ui/DashBoardModal';
import DatePickerFieldNest from '@/components/Ui/DatePickerField';
import FormInput from '@/components/Ui/FormInput';
import FormTextArea from '@/components/Ui/FormTextArea';
import NestErrors from '@/components/Ui/NestErrors';
import useFormHandler from '@/hooks/useFormHandler';
import useHandleResponse from '@/hooks/useHandleResponse';
import { Project } from '@/types/projects.types';
import { addProjectValidationSchema } from '@/Validation/projectValidations';
import { Chip, Select, SelectItem } from '@heroui/react';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

interface IProps {
    id: string;
    data: Project;
}

const parseToArray = (input: any): string[] => {
    try {
        if (Array.isArray(input)) {
            if (input.length === 1 && typeof input[0] === 'string') {
                try {
                    const parsed = JSON.parse(input[0]);
                    if (Array.isArray(parsed)) {
                        return parsed.filter((item) => typeof item === 'string');
                    }
                } catch (e) {
                    return input.filter((item) => typeof item === 'string');
                }
            }
            return input.filter((item) => typeof item === 'string');
        }
        if (typeof input === 'string') {
            const parsed = JSON.parse(input);
            return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
        }
        return [];
    } catch (e) {
        return [];
    }
};

const UpdateProject = ({ id, data }: IProps) => {
    const [currentTech, setCurrentTech] = useState('');
    const [currentTool, setCurrentTool] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        name: data.name,
        description: data.description,
        clientName: data.clientName,
        projectType: data.projectType,
        status: data.status,
        projectURL: data.projectURL,
        githubURL: data.githubURL,
        designFileURL: data.designFileURL,
        techStack: parseToArray(data.techStack),
        designTools: parseToArray(data.designTools),
        from: data.from,
        to: data.to,
    } as Project;

    const formik = useFormHandler(initialValues, addProjectValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('clientName', values.clientName);
        formData.append('projectType', values.projectType);
        formData.append('status', values.status);
        formData.append('projectURL', values.projectURL);
        formData.append('githubURL', values.githubURL);
        formData.append('designFileURL', values.designFileURL);
        formData.append('techStack', JSON.stringify(values.techStack));
        formData.append('designTools', JSON.stringify(values.designTools));
        formData.append('from', values.from);
        formData.append('to', values.to);
        formData.append('projectID', id);

        await handleResponse(updateProjcets(formData));
        handleCloseModal();
    });

    const handleTechKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTech.trim()) {
            e.preventDefault();
            if (!formik.values.techStack.includes(currentTech.trim())) {
                const newTechStack = [...formik.values.techStack, currentTech.trim()];
                formik.setFieldValue('techStack', newTechStack);
                setCurrentTech('');
            }
        }
    };

    const removeTech = (index: number) => {
        const newTechStack = formik.values.techStack.filter((_, i) => i !== index);
        formik.setFieldValue('techStack', newTechStack);
    };

    const handleToolKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentTool.trim()) {
            e.preventDefault();
            if (!formik.values.designTools.includes(currentTool.trim())) {
                const newToolStack = [...formik.values.designTools, currentTool.trim()];
                formik.setFieldValue('designTools', newToolStack);
                setCurrentTool('');
            }
        }
    };

    const removeTool = (index: number) => {
        const newToolStack = formik.values.designTools.filter((_, i) => i !== index);
        formik.setFieldValue('designTools', newToolStack);
    };

    return (
        <>
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
                title="Update Project"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                description="Update your project name, description, and duration. You can also update your project URL, GitHub URL, and a brief description of your project experience."
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
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
                            <NestErrors title={formik.errors.name} color="warning" />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.3}>
                        <FormTextArea
                            name="description"
                            label="Description"
                            placeholder="Enter Project Description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description || ''}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <NestErrors title={formik.errors.description} color="warning" />
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
                            <NestErrors title={formik.errors.clientName} color="warning" />
                        )}
                    </FormMotion>
                    <div className="flex items-center justify-between gap-2">
                        <FormMotion delay={0.5}>
                            <Select
                                placeholder="Select Project Type"
                                isRequired
                                label="Project Type"
                                selectedKeys={[formik.values.projectType]}
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
                                <SelectItem key="Tech" id="Tech">
                                    Tech
                                </SelectItem>
                                <SelectItem key="Design" id="Design">
                                    Design
                                </SelectItem>
                                <SelectItem key="Marketing" id="Marketing">
                                    Marketing
                                </SelectItem>
                                <SelectItem key="Business" id="Business">
                                    Business
                                </SelectItem>
                                <SelectItem key="Creative" id="Creative">
                                    Creative
                                </SelectItem>
                                <SelectItem key="Other" id="Other">
                                    Other
                                </SelectItem>
                            </Select>
                            {formik.touched.projectType && formik.errors.projectType && (
                                <NestErrors title={formik.errors.projectType} color="warning" />
                            )}
                        </FormMotion>
                        <FormMotion delay={0.6}>
                            <Select
                                placeholder="Select Project Status"
                                isRequired
                                label="Project Status"
                                selectedKeys={[formik.values.status]}
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
                                <SelectItem key="Planned" id="Planned">
                                    Planned
                                </SelectItem>
                                <SelectItem key="In-Progress" id="In-Progress">
                                    In-Progress
                                </SelectItem>
                                <SelectItem key="Completed" id="Completed">
                                    Completed
                                </SelectItem>
                                <SelectItem key="On-Hold" id="On-Hold">
                                    On-Hold
                                </SelectItem>
                            </Select>
                            {formik.touched.status && formik.errors.status && (
                                <NestErrors title={formik.errors.status} color="warning" />
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
                                <NestErrors title={formik.errors.projectURL} color="warning" />
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
                                <NestErrors title={formik.errors.githubURL} color="warning" />
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
                                <NestErrors title={formik.errors.designFileURL} color="warning" />
                            )}
                        </FormMotion>
                    </div>
                    <FormMotion delay={1}>
                        <div className="flex flex-col gap-2">
                            <FormInput
                                type="text"
                                onBlur={formik.handleBlur}
                                name="techStackInput"
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
                            <div className="flex flex-wrap gap-2">
                                {formik.values.techStack.map((tech: string, index: number) => (
                                    <Chip
                                        key={index}
                                        color="primary"
                                        isCloseable
                                        onClose={() => removeTech(index)}
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                    >
                                        {tech}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    </FormMotion>
                    <FormMotion delay={1.1}>
                        <div className="flex flex-col gap-2">
                            <FormInput
                                type="text"
                                onBlur={formik.handleBlur}
                                name="designToolsInput"
                                isRequired={false}
                                label="Design Tools"
                                placeholder="Add Tools and press Enter"
                                value={currentTool}
                                onChange={(e) => setCurrentTool(e.target.value)}
                                onKeyDown={handleToolKeyPress}
                                description="(Optional) Add your design tools here. For example: Figma, Adobe XD, Photoshop, etc."
                                size="sm"
                                variant="flat"
                            />
                            <div className="flex flex-wrap gap-2">
                                {formik.values.designTools.map((tool: string, index: number) => (
                                    <Chip
                                        key={index}
                                        color="primary"
                                        isCloseable
                                        onClose={() => removeTool(index)}
                                        size="sm"
                                        radius="sm"
                                        variant="flat"
                                    >
                                        {tool}
                                    </Chip>
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
                                onChange={(value) => formik.setFieldValue('from', value)}
                                onBlur={() => formik.handleBlur('from')}
                                value={formik.values.from}
                            />
                            {formik.touched.from && formik.errors.from && (
                                <NestErrors title={formik.errors.from} color="warning" />
                            )}
                        </FormMotion>
                        <FormMotion delay={1.3}>
                            <DatePickerFieldNest
                                label="End Date"
                                name="to"
                                onChange={(value) => formik.setFieldValue('to', value)}
                                onBlur={() => formik.handleBlur('to')}
                                value={formik.values.to}
                                isDisabled={
                                    formik.values.status === 'In-Progress' ||
                                    formik.values.status === 'Planned' ||
                                    formik.values.status === 'On-Hold'
                                }
                            />
                            {formik.touched.to && formik.errors.to && (
                                <NestErrors title={formik.errors.to} color="warning" />
                            )}
                        </FormMotion>
                    </div>
                </form>
            </DashBoardModal>
        </>
    );
};

export default UpdateProject;