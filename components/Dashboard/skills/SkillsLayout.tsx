'use client'

import SkillsCardDashboard from "@/components/Ui/SkillsCardDashboard";
import { motion } from "framer-motion";

interface IProps {
    skillsData: any
}
const SkillsLayout = ({ skillsData }: IProps) => {
    return <>
        {skillsData?.skillsCount > 0 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total Skills Count: <span className="font-bold">{skillsData?.skillsCount}</span>
                </motion.h4>
            </div>
            :
            ""
        }
        <div className="my-4 w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <SkillsCardDashboard skills={skillsData?.skills || []} />
            </motion.div>
        </div>

    </>;
};

export default SkillsLayout;