'use client'

import { formatDate } from "@/functions/formatDate";
import { BlogPost } from "@/types/blog.types";
import { Card, CardBody, CardFooter, CardHeader, Chip, Image } from "@heroui/react";
import { BiSolidCategory } from "react-icons/bi";
import { MdAccessTimeFilled, MdPublish } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import UpdateBlog from "../Dashboard/blog/UpdateBlog";
import DeleteBlog from "../Dashboard/blog/DeleteBlog";

interface IProps {
    blog: BlogPost
}
const BlogCardDashboard = ({ blog }: IProps) => {
    return <>
        <Card
            shadow="sm"
            className="bg-gray-100 dark:bg-default-50 "

        >
            <CardHeader className="flex-col items-start justify-start gap-2">
                <div className="flex items-start justify-start gap-2">
                    <Chip startContent={<BiSolidCategory />} className="gap-1" size="sm" variant="flat" color="primary">{blog.category}</Chip>
                    <Chip startContent={blog.status === "published" ? <MdPublish /> : <RiDraftFill />} className="gap-1" size="sm" variant="flat" color="primary">{blog.status}</Chip>
                    <Chip startContent={<MdAccessTimeFilled />} className="gap-1" size="sm" variant="flat" color="primary">{formatDate(blog.createdAt)}</Chip>
                </div>
                <p className="text-xs md:text-medium font-bold">{blog.title}</p>
                <p className="line-clamp-3 text-xs text-default-600 md:text-medium font-medium">{blog.content}</p>
            </CardHeader>
            <CardBody className="flex-col items-start justify-start gap-2">
                <Image
                    src={blog.blogImage.url}
                    alt={blog.title}
                    className="object-cover object-center"
                />
                <p className="text-xs md:text-sm text-default-600 font-semibold">SEO Keywords:</p>
                <div className="flex items-start justify-start gap-2">
                    {JSON.parse(blog.seoKeywords[0]).map((keyword: any, index: number) => (
                        <Chip key={index} size="sm" radius="sm" variant="flat" color="warning">
                            {keyword}
                        </Chip>
                    ))}

                </div>
            </CardBody>
            <CardFooter>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateBlog id={blog._id} data={blog} />
                    <DeleteBlog blogID={blog._id} />

                </div>
            </CardFooter>
        </Card>
    </>;
};

export default BlogCardDashboard;