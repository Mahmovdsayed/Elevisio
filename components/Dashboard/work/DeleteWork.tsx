'use client'

import { deleteUserWork } from "@/app/actions/work/work.action";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
    workID: string
}
const DeleteWork = ({ workID }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();


    const deleteNow = async () => {
        setLoading(true)
        await handleResponse(deleteUserWork(workID))
        setLoading(false)
        handleCloseModal()
    }



    return <>
        <Button
            radius="md"
            className="w-full font-medium"
            size="md"
            variant="faded"
            color="danger"
            startContent={<FaTrash />}
            onPress={handleOpenModal}
        >
            Delete
        </Button>


        <DashBoardModal
            isModal
            title="Delete Work Experience"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Warning: This action is irreversible!"
        >
            <div className="px-4 md:px-3">
                <p className="text-sm md:text-base">Are you sure you want to delete this work experience ?</p>
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
                        Delete Work Experience
                    </Button>
                </div>
            </div>
        </DashBoardModal>

    </>;
};

export default DeleteWork;