"use client"

import { deleteCV } from "@/app/actions/cv/delete.action";
import AddNewOrUpdateButton from "../Ui/AddNewOrUpdateButton";
import useHandleResponse from "@/hooks/useHandleResponse";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DashBoardModal from "../Ui/DashBoardModal";
import { Button } from "@heroui/react";

const DeleteCV = ({ id }: { id: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const deleteNow = async () => {
        setLoading(true)
        await handleResponse(deleteCV(id))
        setLoading(false)
        handleCloseModal()
    }

    return <>
        <AddNewOrUpdateButton
            title="Delete"
            variant="faded"
            className="w-full font-medium"
            onPress={handleOpenModal}
            color="danger"
            startContent={<FaTrash />}
            radius="md"
            size="md"
        />
        <DashBoardModal
            title="Delete CV"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Are you sure you want to delete this CV?"
        >
            <div className="px-4 md:px-3">
                <p className="text-sm md:text-base">Are you sure you want to delete this CV?</p>
                <div className="flex justify-end mt-4 space-x-1 font-medium">
                    <Button
                        radius="sm"
                        size="sm"
                        variant="flat"
                        onPress={handleCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        isDisabled={Loading}
                        isLoading={Loading}
                        radius="sm"
                        variant="flat"
                        size="sm"
                        color="danger"
                        onPress={deleteNow}
                    >
                        Delete CV
                    </Button>
                </div>
            </div>
        </DashBoardModal>
    </>
}

export default DeleteCV;
