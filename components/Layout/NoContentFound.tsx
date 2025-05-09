'use client'
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

interface IProps {
    url: string
    title: string
    description: string
}
const NoContentFound = ({ url, title, description }: IProps) => {

    return <>
        <div className="flex items-center justify-center my-12 flex-col gap-2">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Image
                    src={url}
                    className="object-center object-cover size-full lg:w-1/2 m-auto"
                    alt="No Content Found"
                />
            </motion.div>
            <div className="flex flex-col items-center justify-center gap-2 mt-5">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut", type: "spring", stiffness: 200 }}
                    className="text-xl font-bold">{title}</motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2, type: "spring", stiffness: 200 }}
                    className="text-center text-default-500">{description}</motion.p>
            </div>
        </div>
    </>;
};

export default NoContentFound;