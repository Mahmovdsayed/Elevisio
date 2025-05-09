'use client'

import { Certificate } from "@/types/certificate.types";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@heroui/react";
import DeleteCertificate from "../Dashboard/certificate/DeleteCertificate";
import UpdateCertificate from "../Dashboard/certificate/UpdateCertificate";

interface IProps {
    certificate: Certificate
}
const CertificateCardDashboard = ({ certificate }: IProps) => {
    return <>
        <Card
            key={certificate._id}
            shadow="sm"
            className="bg-gray-100 dark:bg-default-50"
        >
            <CardHeader className="p-0">
                <div className="flex items-start flex-col gap-4 w-full">
                    <div className="w-full ">
                        <Image
                            src={certificate.certificateImage.url}
                            alt={certificate.title}
                            removeWrapper
                            className="w-full  md:h-60 rounded-b-none object-cover object-center"
                        />
                    </div>
                    <div className="px-3 pb-4 space-y-1 text-start">

                        <h3 className="text-medium md:text-xl font-semibold capitalize">{certificate.title}</h3>

                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Date : <span className="text-xs md:text-sm font-bold">{certificate.date}</span></p>
                <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Certificate URL : <Link className="text-xs md:text-sm font-bold " href={certificate.certificateURL} showAnchorIcon target="_blank">{certificate.title}</Link></p>
            </CardBody>
            <CardFooter>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateCertificate id={certificate._id} data={certificate} />
                    <DeleteCertificate certificateID={certificate._id} />
                </div>
            </CardFooter>
        </Card>
    </>;
};

export default CertificateCardDashboard;