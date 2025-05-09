'use client'

import { updateSkill } from "@/app/actions/skills/updateSkills.action";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { businessSkills, creativeSkills, designSkills, techSkills } from "@/static/constant";
import { Skill } from "@/types/skills.types";
import { updateSkillValidationSchema } from "@/Validation/skillValidation";
import { Button, Select, SelectItem, SelectSection } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface IProps {
    id: string
    data: Skill
}
const UpdateSkills = ({ data, id }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        name: data.name || "",
        category: data.category || "",
    } as Skill

    const formik = useFormHandler(initialValues, updateSkillValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("skillId", id);
        formData.append("name", values.name);
        formData.append("category", values.category);

        await handleResponse(updateSkill(formData))
        handleCloseModal()

    })


    return <>
        <Button
            onPress={handleOpenModal}
            variant="faded"
            color="primary"
            isIconOnly
            size="sm">
            <FaEdit />
        </Button>

        <DashBoardModal
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            submitButtonText="Update Skill"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update Skill"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update your skill by modifying the skill name and selecting the appropriate category. Ensure the skill is accurately categorized to reflect your expertise."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                <FormInput
                    name="name"
                    label="Skill Name"
                    placeholder="Enter Skill Name"
                    size="sm"
                    variant="flat"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    type="text"
                    isRequired
                />
                {formik.touched.name && formik.errors.name && (
                    <NestErrors title={formik.errors.name} color='warning' />
                )}
                <Select
                    isVirtualized
                    className="mb-1"
                    placeholder="Select Category"
                    isRequired
                    label="Category"
                    size="sm"
                    selectedKeys={[formik.values.category || ""]}
                    radius="md"
                    variant="flat"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    name="category"
                    labelPlacement="inside"
                >
                    <SelectSection showDivider title="Tech Skills">
                        {techSkills.map((item) => (
                            <SelectItem className="capitalize" key={item}>{item}</SelectItem>
                        ))}
                    </SelectSection>
                    <SelectSection showDivider title="Design Skills">
                        {designSkills.map((item) => (
                            <SelectItem className="capitalize" key={item}>{item}</SelectItem>
                        ))}
                    </SelectSection>
                    <SelectSection showDivider title="Business Skills">
                        {businessSkills.map((item) => (
                            <SelectItem className="capitalize" key={item}>{item}</SelectItem>
                        ))}
                    </SelectSection>
                    <SelectSection title="Creative Skills">
                        {creativeSkills.map((item) => (
                            <SelectItem className="capitalize" key={item}>{item}</SelectItem>
                        ))}
                    </SelectSection>
                </Select>
                {formik.touched.category && formik.errors.category && (
                    <NestErrors title={formik.errors.category} color='warning' />
                )}
            </form>
        </DashBoardModal >


    </>;
}

export default UpdateSkills;