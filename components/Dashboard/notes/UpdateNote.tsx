'use client'

import { updateNote } from "@/app/actions/note/updateNote.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Note } from "@/types/note.types";
import { noteValidationSchema } from "@/Validation/noteValidation";
import { Checkbox, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface IProps {
    id: string
    data: Note
}
const UpdateNote = ({ id, data }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        title: data.title || "",
        content: data.content || "",
        type: data.type || "note",
        isCompleted: data.isCompleted || false,
        priority: data.priority || "",
    }

    const formik = useFormHandler(initialValues, noteValidationSchema, async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("type", values.type);
        formData.append("isCompleted", values.isCompleted ? "true" : "false");
        formData.append("priority", values.priority);
        formData.append("noteID", id);

        await handleResponse(updateNote(formData))
        handleCloseModal()


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
            title={`Update ${data.type === "task" ? "Task" : "Note"}`}
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText={`Update ${data.type === "task" ? "Task" : "Note"}`}
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description={`Update your ${data.type === "task" ? "task" : "note"} details, including title, content, type, priority, and completion status.`}
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
                            isSelected={formik.values.isCompleted}
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
        </DashBoardModal >
    </>;
};

export default UpdateNote;