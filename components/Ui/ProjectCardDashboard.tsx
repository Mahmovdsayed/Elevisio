'use client'

import { Project } from "@/types/projects.types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Link } from "@heroui/react";
import { GrProjects, GrStatusGoodSmall } from "react-icons/gr";
import UpdateProject from "../Dashboard/projects/UpdateProject";
import DeleteProject from "../Dashboard/projects/DeleteProject";

interface IProps {
    project: Project
}
const ProjectCardDashboard = ({ project }: IProps) => {
    return <>
        <Card
            key={project._id}
            shadow="sm"
            className="bg-gray-100 dark:bg-default-50"
        >
            <CardHeader className="p-0">
                <div className="flex items-start flex-col gap-4 w-full">
                    <div className="w-full ">
                        <Image
                            src={project.projectImage.url}
                            alt={project.name}
                            removeWrapper
                            className="w-full h-40 md:h-60 rounded-b-none object-cover object-center aspect-video"
                        />
                    </div>
                    <div className="px-3 space-y-1 text-start">
                        <div className="flex items-start justify-start gap-2">
                            <Chip className="gap-1" startContent={<GrProjects />} size="sm" radius="sm" variant="flat" color="primary">{project.projectType}</Chip>
                            <Chip className="gap-1" startContent={<GrStatusGoodSmall />} size="sm" radius="sm" variant="flat" color="primary">{project.status}</Chip>
                        </div>
                        <h3 className="text-medium md:text-xl font-semibold capitalize">{project.name}</h3>
                        {project.status === "Completed" && <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Duration : <span className="font-bold">{project.from} - {project.to}</span></p>
                        }
                        {project.status !== "Completed" && <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Duration : <span className="font-bold">{project.from} - {project.status}</span></p>
                        }

                        <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Client : <span className="font-bold">{project.clientName}</span></p>
                    </div>
                </div>
            </CardHeader>
            <Divider className="mt-4" />
            <CardBody>
                <p className="text-xs md:text-sm text-default-600 capitalize font-medium">{project.description}</p>
                {project.techStack?.[0] &&
                    JSON.parse(project.techStack[0])?.length > 0 && (
                        <div className="flex items-start justify-start gap-2 mt-2 flex-wrap">
                            {JSON.parse(project.techStack[0]).map((techstack: string, index: number) => (
                                <Chip key={index} size="sm" radius="sm" variant="flat" color="primary">
                                    {techstack}
                                </Chip>
                            ))}
                        </div>
                    )}
                {project.designTools?.[0] &&
                    JSON.parse(project.designTools[0])?.length > 0 && (
                        <div className="flex items-start justify-start gap-2 mt-2 flex-wrap">
                            {JSON.parse(project.designTools[0]).map((designTools: string, index: number) => (
                                <Chip key={index} size="sm" radius="sm" variant="flat" color="primary">
                                    {designTools}
                                </Chip>
                            ))}
                        </div>
                    )}
                <div className="flex items-start justify-start gap-1 mt-2 flex-col">
                    {project.projectURL && (
                        <Link href={project.projectURL} showAnchorIcon target="_blank" >{project.projectURL}</Link>
                    )}
                    {project.githubURL && (
                        <Link href={project.githubURL} showAnchorIcon target="_blank" >{project.githubURL}</Link>
                    )}
                    {project.designFileURL && (
                        <Link href={project.designFileURL} showAnchorIcon target="_blank" >{project.designFileURL}</Link>)}
                </div>

            </CardBody>
            <CardFooter>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateProject id={project._id} data={project} />
                    <DeleteProject projectID={project._id} />
                </div>
            </CardFooter>
        </Card >
    </>;
};

export default ProjectCardDashboard;