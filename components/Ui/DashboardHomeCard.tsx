'use client'

import { Button, Card, CardBody, CardHeader, Link } from "@heroui/react";
import { motion } from "framer-motion";

interface IProps {
    title: string
    desc: any
    url?: string
}

const DashboardHomeCard = ({ title, desc, url }: IProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Card
                className="bg-gray-100 dark:bg-default-50 size-full"
                radius="sm"
                shadow="none"
                isPressable
            >
                <CardHeader className="flex justify-between items-center">
                    <h4 className="text-sm font-medium">
                        {title}
                    </h4>
                    {url &&

                        <Button
                            isIconOnly
                            size="sm"
                            radius="sm"
                            color="default"
                            href={url}
                            variant="flat"
                            as={Link}
                            showAnchorIcon
                        ></Button>
                    }
                </CardHeader>
                <CardBody className="pt-0">
                    <p className="text-2xl font-bold">
                        {desc}
                    </p>
                </CardBody>
            </Card>
        </motion.div>
    );
};

export default DashboardHomeCard;
