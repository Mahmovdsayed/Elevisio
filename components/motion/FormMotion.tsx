'use client'

import { motion } from "framer-motion";

interface IProps {
    children: React.ReactNode
    delay: number
}

const FormMotion = ({ children, delay }: IProps) => {

    const inputVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return <>
        <motion.div
            className="w-full"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    </>;
};

export default FormMotion;