'use client'

import { updateBlog } from "@/app/actions/blog/updateBlog.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { BlogPost } from "@/types/blog.types";
import { BlogUpdateValidationSchema } from "@/Validation/updateBlog";
import { Image, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";

interface IProps {
    id: string
    data: BlogPost
}
const UpdateBlog = ({ id, data }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        title: data.title || "",
        content: data.content || "",
        category: data.category || "",
        status: data.status || ""
    }

    const formik = useFormHandler(initialValues, BlogUpdateValidationSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("blogID", id);
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("category", values.category)
        formData.append("status", values.status)
        await handleResponse(updateBlog(formData));
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
            submitButtonText="Update Blog"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title="Update Blog"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update your blog title, content, category, and status."
        >
            <>
            

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1 mt-2">
                    <FormMotion delay={0.2}>
                        <FormInput
                            name="title"
                            label="Blog Title"
                            placeholder="Enter Blog Title"
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
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.content}
                            isRequired={true}
                            placeholder="Enter Blog Content"
                        />
                        {formik.touched.content && formik.errors.content && (
                            <NestErrors title={formik.errors.content} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.4}>
                        <FormInput
                            name="category"
                            label="Category"
                            placeholder="Enter Category"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.category}
                            type="text"
                            isRequired={true}
                        />
                        {formik.touched.category && formik.errors.category && (
                            <NestErrors title={formik.errors.category} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.5}>
                        <Select
                            placeholder="Select Blog Status"
                            isRequired
                            label="Status"
                            size="sm"
                            radius="md"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            selectedKeys={[formik.values.status]}
                            className="w-full mb-1"
                            startContent={formik.values.status === "published" ? <MdPublish /> : <RiDraftFill />}
                            labelPlacement="inside"
                            description="Select the status of the blog. For example: 'Published', 'Draft'"
                            name="status"
                        >
                            <SelectItem color="primary" variant="flat" startContent={<MdPublish />} key={"published"} id="published">Published</SelectItem>
                            <SelectItem color="primary" variant="flat" startContent={<RiDraftFill />} key={"draft"} id="draft">Draft</SelectItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                            <NestErrors title={formik.errors.status} color='warning' />
                        )}
                    </FormMotion>
                </form>
            </>
        </DashBoardModal>

    </>;
};

export default UpdateBlog;