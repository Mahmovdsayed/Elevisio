'use client'

import { deleteCertificate } from "@/app/actions/certificate/deleteCertificate.action";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
    certificateID: string
}
const DeleteCertificate = ({ certificateID }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const deleteNow = async () => {
        setLoading(true)
        await handleResponse(deleteCertificate(certificateID))
        setLoading(false)
        handleCloseModal()
    }

    return <>
        <AddNewOrUpdateButton
            title="Delete"
            className="w-full font-medium"
            variant="faded"
            onPress={handleOpenModal}
            color="danger"
            startContent={<FaTrash />}
            radius="md"
            size="md"
        />
        <DashBoardModal
            isModal
            title="Delete Certificate"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Warning: This action is irreversible!"
        >
            <div className="px-4 md:px-3">
                <p className="text-sm md:text-base">Are you sure you want to delete this Certificate ?</p>
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
                        Delete Certificate
                    </Button>
                </div>
            </div>
        </DashBoardModal>
    </>;
};

export default DeleteCertificate;