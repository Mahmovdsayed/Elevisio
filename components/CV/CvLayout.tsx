'use client'

import { motion } from "framer-motion";
import CVCardDashboard from "./CVCardDashboard";
import { CV } from "@/types/cv.types";


const CvLayout = ({ cvData }: { cvData: any }) => {
    return <>
        {cvData?.cvCount >= 2 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total CVs: <span className="font-bold">{cvData?.cvCount}</span>
                </motion.h4>
                <motion.p
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="text-default-500 text-xs md:text-sm"> You are approaching the maximum limit of <span className="font-bold">2</span> Education Data. You can only add <span className="font-bold">{2 - cvData?.cvCount}</span> more.</motion.p>
            </div>
            :
            ""
        }
        <div className="my-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData?.cv.map((cv: CV, index: number) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={cv._id}>
                        <CVCardDashboard cv={cv} />
                    </motion.div>
                ))}
            </div>
        </div>
    </>
}
export default CvLayout;
