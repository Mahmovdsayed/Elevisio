'use client'
import { deleteContact } from "@/app/actions/contact/deleteContact.action";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Contact } from "@/types/contact.types";
import { Button, Card, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs"
import { FaBehance, FaTrash, FaDiscord, FaDribbble, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPinterest, FaReddit, FaSnapchatGhost, FaTelegram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa"

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

interface IProps {
    contactData: any
}

const ContactLayout = ({ contactData }: IProps) => {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const handleResponse = useHandleResponse();

    const deleteNow = async (contactId: string, linkId: string) => {
        setLoadingId(linkId);
        await handleResponse(deleteContact(contactId, linkId));
        setLoadingId(null);
    }

    return (
        <>
            {contactData?.socialLinksCount > 0 && (
                <div className="mt-4">
                    <motion.h4
                        initial={{ opacity: 0, filter: "blur(3px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="text-xs md:text-sm font-medium"
                    >
                        Total Contact Count: <span className="font-bold">{contactData?.socialLinksCount}</span>
                    </motion.h4>
                </div>
            )}

            <div className="my-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactData?.contacts?.[0]?.socialLinks?.map((contact: any, index: number) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.10 * index,
                                ease: "easeInOut",
                                type: "spring",
                                stiffness: 100
                            }}
                            key={contact._id}
                        >
                            <Card shadow="none" className="bg-gray-100 dark:bg-default-50">
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-default-200 flex items-center justify-center">
                                            {PLATFORM_ICONS[contact.platform as keyof typeof PLATFORM_ICONS]}
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-sm md:text-base font-medium capitalize">
                                                {contact.platform}
                                            </h3>
                                            <Link
                                                href={contact.url}
                                                showAnchorIcon
                                                target="_blank"
                                                className="text-xs md:text-sm font-medium"
                                            >
                                                {contact.platform}
                                            </Link>
                                        </div>
                                    </div>
                                    <Button
                                        variant="flat"
                                        size="sm"
                                        onPress={() => deleteNow(contactData.contacts[0]._id, contact._id)}
                                        startContent={<FaTrash />}
                                        color="danger"
                                        isDisabled={loadingId === contact._id}
                                        isLoading={loadingId === contact._id}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ContactLayout;