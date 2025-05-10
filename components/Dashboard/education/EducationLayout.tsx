'use client'
import EducationCardDashboard from "@/components/Ui/EducationCardDashboard";
import { Education } from "@/types/education.types";
import { motion } from "framer-motion";

interface IProps {
  educationData: any;
}
const EducationLayout = ({ educationData }: IProps) => {

  return <>
    {educationData?.educationCount >= 6 ?
      <div className="mt-4">
        <motion.h4
          initial={{ opacity: 0, filter: "blur(3px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-xs md:text-sm font-medium">
          Total Work Experience: <span className="font-bold">{educationData?.educationCount}</span>
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, filter: "blur(3px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="text-default-500 text-xs md:text-sm"> You are approaching the maximum limit of <span className="font-bold">10</span> Education Data. You can only add <span className="font-bold">{10 - educationData?.educationCount}</span> more.</motion.p>
      </div>
      :
      ""
    }

    <div className="my-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educationData?.education.map((education: Education, index: number) =>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
            key={education._id}>
            <EducationCardDashboard education={education} />
          </motion.div>
        )}
      </div>
    </div>

  </>;
};

export default EducationLayout;