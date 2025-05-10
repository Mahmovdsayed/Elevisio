'use client'
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { motion } from "framer-motion";
import React from "react";
import { IoHome } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";

interface IProps {
    title?: string
    isDashboard?: boolean
    startContent?: React.ReactNode
}


const Breadcrumb = ({ title, isDashboard, startContent }: IProps) => {
    return <>
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <Breadcrumbs>
                <BreadcrumbItem href="/" startContent={<IoHome />} > Home</BreadcrumbItem>
                {isDashboard && <BreadcrumbItem href="/dashboard" startContent={<MdSpaceDashboard />}>Dashboard</BreadcrumbItem>}
                {title && <BreadcrumbItem startContent={startContent}>{title}</BreadcrumbItem>}
            </Breadcrumbs >
        </motion.div>
    </>;
};

export default Breadcrumb;