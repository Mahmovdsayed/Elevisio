"use client"

import { CV } from "@/types/cv.types";
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import DeleteCV from "./DeleteCV";
import UpdateCV from "./UpdateCV";

const CVCardDashboard = ({ cv }: { cv: CV }) => {
    const [pdfUrl, setPdfUrl] = useState("");

    useEffect(() => {
        const encodedUrl = encodeURI(cv.CV.url);
        setPdfUrl(encodedUrl);
    }, [cv.CV.url]);

    return (
        <Card shadow="sm" className="bg-gray-100 dark:bg-default-100">
            <CardHeader className="flex flex-col items-start">
                <h3 className="text-lg font-bold">{cv.name}</h3>
                <span className="text-sm text-default-600 font-medium">
                    {cv.isMainCV === true ? "Main CV" : "Secondary CV"}
                </span>
            </CardHeader>
            <Divider />
            <CardBody className="h-64">
                {pdfUrl ? (
                    <div className="w-full h-full border rounded-lg overflow-hidden">
                        <iframe
                            src={`${pdfUrl}#view=fitH`}
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                            title={`${cv.name} Preview`}
                        >
                            <p className="text-center p-4">
                                Your browser does not support PDF preview.
                                <a href={pdfUrl} className="text-blue-500 ml-2">Download instead</a>
                            </p>
                        </iframe>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading PDF preview...</p>
                    </div>
                )}
            </CardBody>
            <CardFooter className="flex justify-center items-center gap-2">
                <Button
                    variant="faded"
                    color="primary"
                    size="md"

                    className="w-full font-medium"
                    radius="md"
                    onPress={() => window.open(pdfUrl, '_blank')}
                    startContent={<FaDownload />}
                >Download</Button>
                <DeleteCV id={cv._id} />
                <UpdateCV id={cv._id} data={cv} />
            </CardFooter>
        </Card>
    );
};

export default CVCardDashboard;