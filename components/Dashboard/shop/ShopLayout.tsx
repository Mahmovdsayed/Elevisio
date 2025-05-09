'use client'

import { deleteProduct } from "@/app/actions/shop/deleteProduct.action";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import useHandleResponse from "@/hooks/useHandleResponse";
import { ShopItem } from "@/types/shop.types";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface IProps {
    shopData: any
}
const ShopLayout = ({ shopData }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const deleteNow = async (productID: string) => {
        setLoadingId(productID);
        await handleResponse(deleteProduct(productID))
        setLoadingId(null);
        handleCloseModal()
    }

    return <>
        <div className="mt-4">
            <motion.h4
                initial={{ opacity: 0, filter: "blur(3px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="text-xs md:text-sm font-medium">
                Total Products: <span className="font-bold">{shopData?.shopCount}</span>
            </motion.h4>
            {shopData?.shopCount >= 6 ?
                <motion.p
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="text-default-500 text-xs md:text-sm"> You are approaching the maximum limit of <span className="font-bold">10</span> Products Data. You can only add <span className="font-bold">{10 - shopData?.shopCount}</span> more.</motion.p>
                :
                ""
            }
        </div>

        <div className="my-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shopData.shop.map((shop: ShopItem, index: number) =>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={shop._id}>
                        <Card className="bg-gray-100 dark:bg-default-50" shadow="none">
                            <CardHeader className="">
                                <div className="flex items-start flex-col gap-4 w-full">
                                    <div className="w-full ">
                                        <Image
                                            src={shop.productImage.url}
                                            alt={shop.title}
                                            removeWrapper
                                            className="w-full h-80 md:h-60 object-cover object-center aspect-video"
                                        />
                                    </div>
                                    <div className="px-3 space-y-1 text-start">
                                        <h3 className="text-medium md:text-xl font-bold capitalize">{shop.title}</h3>
                                        <p className="text-xs md:text-sm text-default-500 capitalize">{shop.description}</p>
                                    </div>

                                </div>
                            </CardHeader>
                            <CardBody className="px-4">
                                <div className="flex flex-col items-start justify-start gap-2">
                                    <div className="flex items-center justify-between gap-1 w-full">
                                        <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Price : <span className="font-bold">${shop.price}</span></p>
                                        {shop.hasDiscount && <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Discount Price : <span className="font-bold">${shop.discountPrice}</span></p>}
                                    </div>
                                    <div className="flex items-center justify-between gap-1 w-full">
                                        <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Category : <span className="font-bold">{shop.category}</span></p>
                                        <p className="text-xs md:text-sm text-default-600 capitalize font-medium">Status : <span className="font-bold">{shop.status}</span></p>
                                    </div>






                                </div>
                                <div className="flex items-start justify-start gap-1 mt-2 flex-col">
                                    <Link size="sm" href={shop.purchaseLink} target="_blank" showAnchorIcon>Purchase Link</Link>
                                </div>


                            </CardBody>
                            <CardFooter>
                                <div className="flex items-center justify-between gap-2 w-full">
                                    <Button
                                        size="md"
                                        radius="sm"
                                        variant="flat"
                                        color="primary"
                                        className="w-full"
                                        as={Link}
                                        showAnchorIcon
                                        href={shop.purchaseLink}
                                    >
                                        Purchase Link
                                    </Button>
                                    <Button
                                        size="md"
                                        radius="sm"
                                        variant="flat"
                                        startContent={<FaTrash />}
                                        color="danger"
                                        className="w-full"
                                        onPress={() => deleteNow(shop._id)}
                                        isDisabled={loadingId === shop._id}
                                        isLoading={loadingId === shop._id}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </div>
        </div>

    </>;
};

export default ShopLayout;