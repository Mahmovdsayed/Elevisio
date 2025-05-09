'use client'

import { Card, CardBody, CardHeader } from "@heroui/react";

interface IProps {
    title: string
    desc: any
}
const DashboardHomeCard = ({ title, desc }: IProps) => {
    return <>
        <Card className="p-3 bg-gray-100 dark:bg-default-50" radius="sm" shadow="sm" isPressable>
            <CardHeader>
                <h4 className="text-sm font-medium">
                    {title}
                </h4>
            </CardHeader>
            <CardBody className="pt-0">
                <p className="text-2xl font-bold">
                    {desc}
                </p>
            </CardBody>
        </Card>
    </>;
};

export default DashboardHomeCard;