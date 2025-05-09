'use client'

import { Education } from "@/types/education.types";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@heroui/react";
import UpdateEducation from "../Dashboard/education/UpdateEducation";
import DeleteEducation from "../Dashboard/education/DeleteEducation";

interface IProps {
    education: Education
}
const EducationCardDashboard = ({ education }: IProps) => {
    return <>
        <Card
            key={education._id}
            className="bg-gray-100 dark:bg-default-50"
            shadow="sm"
        >
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <Image
                        src={education.schoolImage.url}
                        alt={education.schoolName}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    />
                    <div>
                        <h3 className="text-xs md:text-sm font-semibold capitalize">{education.schoolName}</h3>
                        <p className="text-xs md:text-sm text-default-600 capitalize">faculty of {education.faculty}</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="mt-3 space-y-1">
                    <p className="text-xs md:text-sm text-default-600">
                        <span className="font-medium">Duration:</span> {education.from} - {education.status === "Currently Studying" ? "Currently Studying" : education.to}
                    </p>
                    {education.gpa && (
                        <p className="text-xs md:text-sm text-default-600">
                            <span className="font-medium ">GPA:</span> {education.gpa}
                        </p>
                    )}
                    {education.location && (
                        <p className="text-xs md:text-sm text-default-600">
                            <span className="font-medium ">Location:</span> {education.location}
                        </p>
                    )}
                    {education.certificateURL && (
                        <p className="text-xs md:text-sm text-default-600">
                            <span className="font-medium ">certificateURL:</span> <Link href={education.certificateURL} showAnchorIcon title="certificateURL" target="_blank" >certificateURL</Link>
                        </p>
                    )}
                    {education.description && (
                        <p className="text-xs md:text-sm text-default-600">
                            <span className="font-medium ">Description:</span> {education.description}
                        </p>
                    )}
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateEducation id={education._id} data={education} />
                    <DeleteEducation educationID={education._id} />
                </div>
            </CardFooter>
        </Card>
    </>;
};

export default EducationCardDashboard;