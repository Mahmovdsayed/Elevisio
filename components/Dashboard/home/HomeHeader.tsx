'use client'

import { Button, Card, Chip, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";

interface IProps {
    data: any
}

const HomeHeader = ({ data }: IProps) => {
    return (
        <motion.div
            className="mt-3 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <Card
                shadow="none"
                radius="sm"
                className="p-3 bg-gray-100 dark:bg-default-50"
            >
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="flex-shrink-0">
                            <Image
                                radius="full"
                                src={data?.HomeData?.Image}
                                alt={data?.HomeData?.fullName}
                                className="w-12 h-12 md:w-14 md:h-14 object-cover"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold capitalize">
                                {data?.HomeData?.fullName}
                            </h2>
                            <p className="text-xs md:text-sm text-default-600">
                                {data?.HomeData?.userEmail}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button
                            size="sm"
                            radius="md"
                            color="default"
                            variant="flat"
                            as={Link}
                            href="/dashboard/info"
                            showAnchorIcon
                        >
                            Edit
                        </Button>
                    </motion.div>
                </div>
            </Card>
        </motion.div>
    );
};

export default HomeHeader;
