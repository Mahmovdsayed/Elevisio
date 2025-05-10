'use client'

import { WorkExperience } from "@/types/work.type";
import { Button, Card, CardBody, CardFooter, Divider, Image, Skeleton } from "@heroui/react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteWork from "./DeleteWork";
import UpdateWork from "./UpdateWork";

interface IProps {
    workData: any
}
const WorkLayout = ({ workData }: IProps) => {

    return <>
        {workData?.workCount >= 6 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total Work Experience: <span className="font-bold">{workData?.workCount}</span>
                </motion.h4>
                <motion.p
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="text-default-500 text-xs md:text-sm"> You are approaching the maximum limit of <span className="font-bold">10</span> work experiences. You can only add <span className="font-bold">{10 - workData?.workCount}</span> more.</motion.p>
            </div>
            :
            ""
        }

        <div className="my-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {workData?.work?.map((work: WorkExperience, index: number) =>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={work._id}>
                        <Card key={work._id} className="bg-gray-100 dark:bg-default-50" shadow="none">
                            <CardBody className="p-4">
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={work.companyImage.url}
                                        alt={work.companyName}
                                        className="w-14 h-14 object-center object-cover"

                                    />

                                    <div>
                                        <h3 className="text-md font-semibold capitalize">{work.companyName}</h3>
                                        <p className="text-sm text-default-600 capitalize">{work.positionName}</p>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    <p className="text-sm text-default-700">
                                        <span className="font-medium">Type:</span>
                                        <span className="text-default-500 ms-1">
                                            {work.employmentType}
                                        </span>
                                    </p>
                                    <p className="text-sm text-default-700">
                                        <span className="font-medium">Duration:</span>
                                        <span className="text-default-500 ms-1">
                                            {work.from} - {work.current ? "Present" : work.to}
                                        </span>
                                    </p>
                                    <p className="text-sm text-default-700 line-clamp-2">
                                        <span className="font-medium ">Description:</span>
                                        <span className="text-default-500 ms-1">
                                            {work.description ? work.description : "No Description"}
                                        </span>
                                    </p>
                                </div>
                            </CardBody>
                            <Divider />
                            <CardFooter className="p-4">
                                <div className="flex items-center justify-center w-full space-x-2">
                                    <UpdateWork id={work._id} data={work} />
                                    <DeleteWork workID={work._id} />
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>

                )}
            </div>
        </div>

    </>;
};

export default WorkLayout;