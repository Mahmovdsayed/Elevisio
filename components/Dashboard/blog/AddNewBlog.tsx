'use client'

import { addBlog } from "@/app/actions/blog/addBlog.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import { AddToast } from "@/functions/AddToast";
import { compressImage } from "@/functions/compressImage";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { addNewBlogInitialState } from "@/services/InitialState";
import { BlogValidationSchema } from "@/Validation/blogValidation";
import { Chip, Select, SelectItem } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";


const AddNewBlog = () => {

    const [seoKeywords, setSeoKeywords] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)
    const handleResponse = useHandleResponse()

    const handleSEOKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && seoKeywords.trim()) {
            e.preventDefault();
            const newSEOKeywords = [...formik.values.seoKeywords, seoKeywords.trim()];
            formik.setFieldValue('seoKeywords', newSEOKeywords);
            setSeoKeywords('');
        }
    };
    const removeTech = (index: number) => {
        const newSEOKeywords = formik.values.seoKeywords.filter((_, i) => i !== index);
        formik.setFieldValue('seoKeywords', newSEOKeywords);
    };

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "banner");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("blogImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(addNewBlogInitialState, BlogValidationSchema as any, async (values) => {

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("category", values.category)
        formData.append("status", values.status)
        formData.append("seoKeywords", JSON.stringify(values.seoKeywords))
        if (values.blogImage instanceof File) { formData.append("blogImage", values.blogImage); }

        await handleResponse(addBlog(formData), formik.resetForm)
        handleCloseModal()

    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6"
        >
            <AddNewOrUpdateButton
                title="Add New Blog"
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
            title="Add New Blog"
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            onButtonPress={formik.handleSubmit}
            submitButtonText="Add New Blog"
            startContent={<IoMdAdd />}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Please fill in the form below to add a new blog."
        >
            <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
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
                        description="Enter the Blog category. For example: 'Technology', 'Lifestyle', 'Travel', etc."
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
                <FormMotion delay={0.6}>
                    <FormInput
                        type="file"
                        isRequired={true}
                        label="Upload Blog Image"
                        name="blogImage"
                        accept
                        placeholder="Upload Blog Image"
                        onBlur={formik.handleBlur}
                        onChange={handleImageChange}
                        variant="flat"
                        description="For best results, please upload image (1920x1080 pixels). Supported formats: PNG, JPEG, JPG."
                        size="sm"
                    />
                    {formik.touched.blogImage && formik.errors.blogImage && (
                        <NestErrors title={formik.errors.blogImage} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.7}>
                    <div className="flex flex-col gap-2">
                        <FormInput
                            type="text"
                            onBlur={formik.handleBlur}
                            name="seoKeywords"
                            isRequired={true}
                            label="seo Keywords"
                            placeholder="Add technology and press Enter"
                            value={seoKeywords}
                            onChange={(e) => setSeoKeywords(e.target.value)}
                            onKeyDown={handleSEOKeyPress}
                            description="Add SEO keywords to help search engines find your blog. For example: 'React', 'Next.js', 'JavaScript', etc."
                            size="sm"
                            variant="flat"
                        />

                        <div className="flex flex-wrap gap-2 mb-1">
                            {formik.values.seoKeywords.map((tech, index) => (
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
            </form>
        </DashBoardModal >

    </>;
};

export default AddNewBlog;