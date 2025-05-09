'use client'

import { addProduct } from "@/app/actions/shop/addProduct.action";
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
import { addNewProductInitialState } from "@/services/InitialState";
import { shopSchema } from "@/Validation/shopValidation";
import { Checkbox } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

const AddNewProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleResponse = useHandleResponse();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file);
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("productImage", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const formik = useFormHandler(addNewProductInitialState, shopSchema as any, async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        if (values.productImage instanceof File) {
            formData.append("productImage", values.productImage);
        }
        formData.append("hasDiscount", values.hasDiscount ? "true" : "false");
        if (values.hasDiscount) {
            formData.append("discountPrice", values.discountPrice);
        }
        formData.append("category", values.category);
        formData.append("purchaseLink", values.purchaseLink);

        await handleResponse(addProduct(formData), formik.resetForm)
        handleCloseModal()



    })

    return <>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6">
            <AddNewOrUpdateButton
                title="Add New Product"
                className="w-full lg:w-fit font-medium"
                variant="bordered"
                color="default"
                startContent={<IoMdAdd />}
                radius="full"
                size="md"
                onPress={handleOpenModal}
            />

            <DashBoardModal
                title="Add New Product"
                submitButtonDisabled={formik.isSubmitting}
                submitButtonLoading={formik.isSubmitting}
                onButtonPress={formik.handleSubmit}
                submitButtonText="Add New Product"
                startContent={<IoMdAdd />}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                description="Enter your product name, description, price. You can also add your product image."
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                    <FormMotion delay={0.2}>
                        <FormInput
                            name="title"
                            label="Product Name"
                            placeholder="Enter Product Name"
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
                            isRequired={true}
                            name="description"
                            label="Description"
                            placeholder="Enter Product Description"
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
                            name="price"
                            label="Product Price"
                            placeholder="0.00"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={String(formik.values.price)}
                            type="number"
                            description="Enter the product price in USD. Only positive numeric values are allowed."
                            isRequired={true}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }

                        />
                        {formik.touched.price && formik.errors.price && (
                            <NestErrors title={formik.errors.price} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.5}>
                        <Checkbox
                            color="primary"
                            size="sm"
                            className="mb-1 px-4 text-wrap"
                            name="hasDiscount"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                                formik.setFieldValue("hasDiscount", e.target.checked);
                                if (e.target.checked) {
                                    formik.setFieldValue("to", null);
                                }
                            }}
                            value={formik.values.hasDiscount as any}
                        >
                            Do you want to add discount to this product ?
                        </Checkbox>
                        {formik.touched.hasDiscount && formik.errors.hasDiscount && (
                            <NestErrors title={formik.errors.hasDiscount} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.6}>
                        <FormInput
                            name="discountPrice"
                            label="Discount Price"
                            placeholder="0.00"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={String(formik.values.discountPrice)}
                            type="number"
                            description="Enter the discount price in USD. Only positive numeric values are allowed."
                            isRequired={formik.values.hasDiscount}
                            isDisabled={!formik.values.hasDiscount}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }

                        />
                        {formik.touched.discountPrice && formik.errors.discountPrice && (
                            <NestErrors title={formik.errors.discountPrice} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.7}>
                        <FormInput
                            name="category"
                            label="Category"
                            placeholder="Enter Product Category"
                            description="Enter the product category. For example: Electronics, Clothing, Books, etc."
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
                    <FormMotion delay={0.8}>
                        <FormInput
                            name="purchaseLink"
                            label="Purchase URL"
                            placeholder="Enter Purchase URL"
                            description="Enter the product purchase URL. For example: https://www.example.com/product/123"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.purchaseLink}
                            type="text"
                            isRequired={true}
                        />
                        {formik.touched.purchaseLink && formik.errors.purchaseLink && (
                            <NestErrors title={formik.errors.purchaseLink} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.9}>
                        <FormInput
                            type="file"
                            isRequired={true}
                            label="Upload Product Image"
                            name="productImage"
                            accept
                            placeholder="Upload Product Image"
                            onBlur={formik.handleBlur}
                            onChange={handleImageChange}
                            variant="flat"
                            size="sm"
                        />
                        {formik.touched.productImage && formik.errors.productImage && (
                            <NestErrors title={formik.errors.productImage} color='warning' />
                        )}
                    </FormMotion>
                </form>
            </DashBoardModal>

        </motion.div >
    </>;
};



export default AddNewProduct;