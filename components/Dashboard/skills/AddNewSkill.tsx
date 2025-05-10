'use client'

import { addSkill } from "@/app/actions/skills/addSkills.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { addNewSkillInitialState } from "@/services/InitialState";
import { businessSkills, creativeSkills, designSkills, techSkills } from "@/static/constant";
import { skillValidationSchema } from "@/Validation/skillValidation";
import { Button, Select, SelectItem, SelectSection } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface IProps {

}

interface SkillFormValues {
    name: string[];
    category: string;
}

const AddNewSkill = ({ }: IProps) => {



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [skills, setSkills] = useState([""]);
    const handleResponse = useHandleResponse();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSkillChange = (index: number, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const handleAddSkillField = () => {
        setSkills([...skills, ""]);
    };

    const handleRemoveSkill = (index: number) => {
        const updatedSkills = skills.filter((_, i) => i !== index);
        setSkills(updatedSkills);
    };


    const formik = useFormHandler<SkillFormValues>(addNewSkillInitialState, skillValidationSchema as any, async (values) => {
        const formData = new FormData();

        formData.append("category", values.category);

        values.name.forEach((skill, index) => {
            formData.append("name[]", skill);
        });

        await handleResponse(addSkill(formData), formik.resetForm);
        handleCloseModal();
    });
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
                className="lg:mt-3 lg:mb-6">
                <AddNewOrUpdateButton
                    title="Add New Skill"
                    className="w-full lg:w-fit font-medium"
                    variant="bordered"
                    color="default"
                    startContent={<IoMdAdd />}
                    radius="full"
                    size="md"
                    onPress={handleOpenModal}
                />
            </motion.div>

            <DashBoardModal
                title="Add New Skill"
                submitButtonDisabled={formik.isSubmitting}
                submitButtonLoading={formik.isSubmitting}
                onButtonPress={formik.handleSubmit}
                submitButtonText="Add New Skill"
                startContent={<IoMdAdd />}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                description="Add your skills by entering the skill name and selecting the appropriate category. Organize your skills under different categories to clearly showcase your areas of expertise."
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                    <FormMotion delay={0.1}>
                        <Select
                            isVirtualized
                            className="mb-1"
                            placeholder="Select Category"
                            isRequired
                            label="Category"
                            size="sm"
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
                    </FormMotion>

                    {formik.values.name.map((_, index) => (
                        <div key={index} className="flex items-center gap-2 w-full">
                            <FormMotion delay={0.2}>
                                <FormInput
                                    name={`name[${index}]`}
                                    label="Skill Name"
                                    placeholder="Enter Skill Name"
                                    size="sm"
                                    variant="flat"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name[index]}
                                    type="text"
                                    isRequired
                                />
                            </FormMotion>

                            {index > 0 && (
                                <Button
                                    radius="md"
                                    variant="flat"
                                    color="danger"
                                    onPress={() => {
                                        const updatedSkills = [...formik.values.name];
                                        updatedSkills.splice(index, 1);
                                        formik.setFieldValue("name", updatedSkills);
                                    }}
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    {formik.touched.name && formik.errors.name && (
                        <NestErrors title={Array.isArray(formik.errors.name) ? formik.errors.name[0] : formik.errors.name} color="warning" />
                    )}

                    <FormMotion delay={0.3}>
                        <Button
                            type="button"
                            onPress={() =>
                                formik.setFieldValue("name", [...formik.values.name, ""])
                            }
                            size="sm"
                            radius="md"
                            className="w-fit"
                            color="primary"
                            variant="flat"
                            startContent={<IoMdAdd />}
                        >
                            Add Another Skill
                        </Button>
                    </FormMotion>

                </form>
            </DashBoardModal>
        </>
    );
};

export default AddNewSkill;
