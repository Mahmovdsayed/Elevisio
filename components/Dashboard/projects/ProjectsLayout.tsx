'use client'
import ProjectCardDashboard from "@/components/Ui/ProjectCardDashboard";
import { Project } from "@/types/projects.types";
import { motion } from "framer-motion";

interface IProps {
    projectData: any;
}
const ProjectsLayout = ({ projectData }: IProps) => {
    return <>
        {projectData?.projectCount > 0 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total Projects Count: <span className="font-bold">{projectData?.projectCount}</span>
                </motion.h4>
            </div>
            :
            ""
        }


        <div className="my-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projectData.project.map((project: Project, index: number) =>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={project._id}>
                        <ProjectCardDashboard project={project} />
                    </motion.div>
                )}
            </div>
        </div>

    </>;
};

export default ProjectsLayout;