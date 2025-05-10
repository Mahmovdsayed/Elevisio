'use client'

import { motion } from "framer-motion";

interface IProps {
    title: string;
    description: string;
    isDashboard?: boolean
}

const TextHeader = ({ title, description, isDashboard }: IProps) => {
    return <>
        <div className={isDashboard ? "mt-3 mb-6 text-start" : "mb-4 text-start lg:w-9/12 lg:mx-auto"}>
            <motion.h1
                className="font-bold text-2xl md:text-4xl mb-2"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -20, },
                    visible: { opacity: 1, y: 0, },
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {title}
            </motion.h1>
            <motion.p
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -20, },
                    visible: { opacity: 1, y: 0, },
                }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                className="text-xs md:text-sm text-default-500 font-medium lg:w-9/12 ">{description}</motion.p>
        </div>
    </>;
};

export default TextHeader;