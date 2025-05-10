'use client'

import BlogCardDashboard from "@/components/Ui/BlogCardDashboard";
import { BlogPost } from "@/types/blog.types";
import { motion } from "framer-motion";

interface IProps {
    blogData: any
}

const BlogLayout = ({ blogData }: IProps) => {
    return <>
        {blogData?.blogCount > 0 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total Blog Count: <span className="font-bold">{blogData?.blogCount}</span>
                </motion.h4>
            </div>
            :
            ""
        }


        <div className="my-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {blogData?.blogs?.map((blog: BlogPost, index: number) =>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={blog._id}>
                        <BlogCardDashboard blog={blog} />
                    </motion.div>
                )}
            </div>
        </div>
    </>;
};

export default BlogLayout;