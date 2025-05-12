'use client'

import { getTimeSince } from "@/functions/formatDuration";
import { User } from "@/types/userInfo.types";
import { Card, CardBody, CardHeader, Chip, Divider, Image, Link } from "@heroui/react";
import { MdVerified } from "react-icons/md";
import UpdateUserInfo from "./UpdateUserInfo";
import UploadImage from "@/components/Ui/UploadImage";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import DeleteUser from "./DeleteUser";

const Info = ({ data, dominantColor, textColor }: { data: User, dominantColor: string, textColor: string }) => {

    return <>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "linear", type: "spring", damping: 5 }}
            className="my-4"
        >
            <Card
                // style={{
                //     backgroundImage: `linear-gradient(to bottom, ${dominantColor}, ${textColor === "#FFFFFF" ? "#111111" : "#9f9f9f"
                //         })`,
                //     color: textColor,
                // }}
                shadow="none"
                radius="lg"
                className=" md:p-4 bg-gray-100 dark:bg-default-50"
            >
                <CardHeader>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex items-center justify-between w-full"
                    >
                        <h4 className="font-semibold text-xl">About Me</h4>

                    </motion.div>
                </CardHeader>
                <CardBody className="px-4 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center justify-between w-full"
                    >
                        <div className="flex items-center justify-start gap-4">
                            <Image
                                src={data.image.url}
                                className="w-24 md:w-32 object-cover object-center"
                                alt={data.userName}
                                isZoomed
                            />
                            <div className="text-start">
                                <h5 className="font-semibold text-lg md:text-xl capitalize">
                                    {data.firstName} {data.lastName}
                                </h5>
                                <span className="text-tiny md:text-sm">@{data.userName}</span>
                                <h6 className="font-medium text-xs md:text-sm ">
                                    {getTimeSince(data.createdAt)}
                                </h6>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-4"
                    >
                        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                            <UploadImage
                                folderName="Avatar"
                                title="Upload Image"
                                color="default"
                                className="w-full"
                                startContent={<FaUpload />}
                                size="sm"
                                radius="full"
                                imageURL={data.image.url}
                            />
                            <UpdateUserInfo data={data} />
                            <DeleteUser userID={data._id} />
                        </div>
                    </motion.div>
                    <Divider className="my-4" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col items-start justify-center gap-3"
                    >
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Email:</h5>
                            <div className="flex items-center justify-center gap-1">
                                <p className="text-sm md:text-base">{data.email}</p>
                                {data.isVerified ? (
                                    <Chip
                                        color="default"
                                        variant="flat"
                                        title="Verified"
                                        size="sm"
                                        startContent={<MdVerified />}
                                        radius="lg"
                                        className="ms-1"
                                    >
                                        Verified
                                    </Chip>
                                ) : (
                                    "Not Verified"
                                )}
                            </div>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Current Position:</h5>
                            <p className="text-sm md:text-base ">
                                {data.positionName ? data.positionName : "Please update your position"}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Gender:</h5>
                            <p className="text-sm md:text-base ">
                                {data.gender == null ? "Please update your gender" : data.gender}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Birth Date:</h5>
                            <p className="text-sm md:text-base ">
                                {data.birthday ? data.birthday : "Please update your birth date"}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap2 w-full md:max-w-lg">
                            <div className="text-start">
                                <h5 className="font-semibold text-sm md:text-base">Country</h5>
                                <p className="text-sm md:text-base ">
                                    {data.country ? data.country : "not selected yet"}
                                </p>
                            </div>
                            <div className="text-center">
                                <h5 className="font-semibold text-sm md:text-base">City</h5>
                                <p className="text-sm md:text-base ">
                                    {data.city ? data.city : "not selected yet"}
                                </p>
                            </div>
                            <div className="text-center">
                                <h5 className="font-semibold text-sm md:text-base">Nationality</h5>
                                <p className="text-sm md:text-base ">
                                    {data.nationality ? data.nationality : "not selected yet"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Phone Number:</h5>
                            <p className="text-sm md:text-base ">
                                {data.phone ? data.phone : "not selected yet"}
                            </p>
                        </div>
                        {data.website ? (
                            <div>
                                <h5 className="font-semibold text-sm md:text-base">Website:</h5>
                                <Link
                                    color="primary"
                                    href={data.website}
                                    showAnchorIcon
                                    className="text-sm md:text-base"
                                >
                                    {data.website}
                                </Link>
                            </div>
                        ) : (
                            ""
                        )}
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">about:</h5>
                            <p className="text-sm md:text-base  md:max-w-lg lg:max-w-2xl">
                                {data.about ? data.about : "Please update your about"}
                            </p>
                        </div>
                    </motion.div>
                </CardBody>
            </Card>
        </motion.div>
    </>;
};

export default Info;