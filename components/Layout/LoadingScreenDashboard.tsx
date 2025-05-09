"use client";

import { motion } from "framer-motion";

const LoadingScreenDashboard = () => {
    return (
        <motion.div
            className="flex items-center justify-center min-h-screen bg-white dark:bg-black"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <motion.div
                className="w-16 h-16 border-4 border-t-transparent border-black dark:border-white rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </motion.div>
    );
};

export default LoadingScreenDashboard;
