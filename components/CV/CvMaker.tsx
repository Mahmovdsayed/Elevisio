'use client';

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ProfessionalCVGenerator from "./CVGenerator";
import { useState } from "react";
import { getCVData } from "@/services/services";
import { AddToast } from "@/functions/AddToast";

const CvMaker = () => {
    const [cvData, setCvData] = useState<any>(null);
    const [loadingData, setLoadingData] = useState(false);

    const handleGenerate = async () => {
        setLoadingData(true);
        try {
            const res = await getCVData();
            if (!res?.success) {
                AddToast("Missing CV Data", 5000, "danger", res?.message);
            } else {
                setCvData(res.data);
            }
        } catch (error) {
            console.error("Error fetching CV data");
        } finally {
            setLoadingData(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut", type: "spring", stiffness: 200 }}
            className="lg:mt-3 lg:mb-6"
        >
            {!cvData ? (
                <Button
                    size="md"
                    color="secondary"
                    radius="full"
                    className="w-full font-semibold bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 text-white"
                    startContent={<BsStars />}
                    onPress={handleGenerate}
                    isLoading={loadingData}
                >
                    {loadingData ? "Preparing..." : "Generate CV"}
                </Button>
            ) : (
                <PDFDownloadLink
                    document={<ProfessionalCVGenerator cvData={cvData} />}
                    fileName={`${cvData.personalInfo.fullName
                        .split(' ')
                        .map((word: string) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join('-')
                        + '-CV'
                        }`}
                >
                    {({ loading }) => (
                        <Button
                            size="md"
                            color="secondary"
                            radius="full"
                            className="w-full font-semibold bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700 text-white"
                            startContent={<BsStars />}
                            isDisabled={loading}
                        >
                            {loading ? 'Preparing PDF...' : 'Download CV'}
                        </Button>
                    )}
                </PDFDownloadLink>
            )}
        </motion.div>
    );
};

export default CvMaker;
