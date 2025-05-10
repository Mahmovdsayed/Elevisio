'use client'

import { addContact } from "@/app/actions/contact/addContact.action"
import FormMotion from "@/components/motion/FormMotion"
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton"
import DashBoardModal from "@/components/Ui/DashBoardModal"
import FormInput from "@/components/Ui/FormInput"
import NestErrors from "@/components/Ui/NestErrors"
import useFormHandler from "@/hooks/useFormHandler"
import useHandleResponse from "@/hooks/useHandleResponse"
import { contactInitialState } from "@/services/InitialState"
import { contactValidationSchema } from "@/Validation/contactValidation"
import { Select, SelectItem } from "@heroui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { BsTwitterX } from "react-icons/bs"
import { FaBehance, FaDiscord, FaDribbble, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPinterest, FaReddit, FaSnapchatGhost, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"

// كائن يحتوي على أيقونات المنصات
const PLATFORM_ICONS = {
    facebook: <FaFacebook />,
    instagram: <FaInstagram />,
    twitter: <BsTwitterX />,
    linkedIn: <FaLinkedin />,
    github: <FaGithub />,
    behance: <FaBehance />,
    dribbble: <FaDribbble />,
    whatsapp: <FaWhatsapp />,
    telegram: <FaTelegram />,
    youtube: <FaYoutube />,
    tiktok: <FaTiktok />,
    discord: <FaDiscord />,
    snapchat: <FaSnapchatGhost />,
    pinterest: <FaPinterest />,
    reddit: <FaReddit />
}

const PLATFORMS = Object.keys(PLATFORM_ICONS) as Array<keyof typeof PLATFORM_ICONS>

const AddNewContact = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)
    const handleResponse = useHandleResponse()

    const formik = useFormHandler(contactInitialState, contactValidationSchema, async (values) => {
        const formData = new FormData()
        formData.append("platform", values.platform)
        formData.append("url", values.url)
        await handleResponse(addContact(formData), formik.resetForm)
        handleCloseModal()
    })

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut", type: "spring", stiffness: 200 }}
                className="lg:mt-3 lg:mb-6"
            >
                <AddNewOrUpdateButton
                    title="Add New Contact"
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
                title="Add New Contact"
                submitButtonDisabled={formik.isSubmitting}
                submitButtonLoading={formik.isSubmitting}
                onButtonPress={formik.handleSubmit}
                submitButtonText="Add New Contact"
                startContent={<IoMdAdd />}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                description="Enter your contact platform and URL."
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-1">
                    <FormMotion delay={0.2}>
                        <Select
                            isRequired={true}
                            label="Platform"
                            name="platform"
                            placeholder="Select Platform"
                            size="sm"
                            variant="flat"
                            startContent={formik.values.platform ? PLATFORM_ICONS[formik.values.platform as keyof typeof PLATFORM_ICONS] : null}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.platform}
                            className="capitalize"
                            description="Select your contact platform."
                        >
                            {PLATFORMS.map((platform) => (
                                <SelectItem
                                    key={platform}
                                    id={platform}
                                    className="capitalize"
                                    startContent={PLATFORM_ICONS[platform]}
                                >
                                    {platform}
                                </SelectItem>
                            ))}
                        </Select>
                        {formik.touched.platform && formik.errors.platform && (
                            <NestErrors title={formik.errors.platform} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.3}>
                        <FormInput
                            name="url"
                            label="PlatForm URL"
                            placeholder="Enter PlatForm URL"
                            size="sm"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.url}
                            description="Enter your contact URL."
                            type="url"
                            isRequired={true}
                        />
                        {formik.touched.url && formik.errors.url && (
                            <NestErrors title={formik.errors.url} color='warning' />
                        )}
                    </FormMotion>
                </form>
            </DashBoardModal>
        </>
    )
}

export default AddNewContact