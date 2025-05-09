'use client'

import { addNote } from "@/app/actions/note/addNote.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { noteInitialState } from "@/services/InitialState";
import { noteValidationSchema } from "@/Validation/noteValidation";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";


const AddNewNote = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleResponse = useHandleResponse();
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const formik = useFormHandler(noteInitialState, noteValidationSchema, async (values) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("content", values.content)
        formData.append("type", values.type)
        formData.append("priority", values.priority)
        formData.append("isCompleted", values.isCompleted ? "true" : "false")

        await handleResponse(addNote(formData), formik.resetForm)
        handleCloseModal()

    })

    return <>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Add New Note or Task"
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
            title="Add New Note or Task"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Add New Note or Task"
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Enter your note or task details, including title, content, type, priority, and completion status."
        >
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                <FormMotion delay={0.2}>
                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Enter Title"
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
                    <FormTextArea
                        label="Content"
                        name="content"
                        placeholder="Enter Content"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.content}
                        isRequired={true}
                    />
                    {formik.touched.content && formik.errors.content && (
                        <NestErrors title={formik.errors.content} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.4}>
                    <Select
                        size="sm"
                        variant="flat"
                        radius="md"
                        label="Type"
                        placeholder="Select Type"
                        name="type"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        selectedKeys={[formik.values.type]}
                        labelPlacement="inside"
                    >
                        <SelectItem key={"note"} id="note">Note</SelectItem>
                        <SelectItem key={"task"} id="task">Task</SelectItem>
                        <SelectItem key={"todo"} id="todo">Todo</SelectItem>
                    </Select>
                    {formik.touched.type && formik.errors.type && (
                        <NestErrors title={formik.errors.type} color='warning' />
                    )}
                </FormMotion>
                {!formik.values.type || formik.values.type === "note" ?
                    ""
                    :
                    <FormMotion delay={0.5}>
                        <Select
                            size="sm"
                            variant="flat"
                            radius="md"
                            className="my-1"
                            label="Priority"
                            placeholder="Select Priority"
                            name="priority"
                            onChange={formik.handleChange}
                            selectedKeys={[formik.values.priority]}
                            onBlur={formik.handleBlur}
                            labelPlacement="inside"
                        >
                            <SelectItem key={"low"} id="low">Low</SelectItem>
                            <SelectItem key={"medium"} id="medium">Medium</SelectItem>
                            <SelectItem key={"high"} id="high">High</SelectItem>
                        </Select>
                        {formik.touched.priority && formik.errors.priority && (
                            <NestErrors title={formik.errors.priority} color='warning' />
                        )}
                    </FormMotion>
                }
                {formik.values.type === "task" || formik.values.type === "todo" ?

                    <FormMotion delay={0.6}>
                        <Checkbox
                            color="primary"
                            size="sm"
                            className="mb-1 px-4 text-wrap"
                            name="isCompleted"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.setFieldValue("isCompleted", e.target.checked);
                            }}
                            value={formik.values.isCompleted as any}

                        >
                            Is Completed
                        </Checkbox>
                    </FormMotion> : ""
                }
            </form>
        </DashBoardModal>

    </>;
};

export default AddNewNote;