'use client'

import { deleteUser } from "@/app/actions/user/deleteUser";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
    userID: string
}
const DeleteUser = ({ userID }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Loading, setLoading] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();


    const deleteNow = async () => {
        setLoading(true)
        await handleResponse(deleteUser(userID), () => { }, '/')
        setLoading(false)
        handleCloseModal()
    }

    return <>
        <AddNewOrUpdateButton
            title="Delete Account"
            color="danger"
            className="w-full font-medium"
            onPress={handleOpenModal}
            startContent={<FaTrash />}
            size="sm"
            radius="full"
        />
        <DashBoardModal
            isModal
            title="Delete Account"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="This action is permanent and cannot be undone."
        >
            <div className="px-4 md:px-3">
                <p className="text-xs md:text-sm mb-2">
                    Are you sure you want to permanently delete your account? <br />
                </p>
                <strong className="text-xs md:text-sm">All your data including posts, comments, and any associated content will be permanently removed.</strong>
                <div className="flex justify-end mt-6 space-x-1 font-medium">
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
                        Confirm Delete
                    </Button>
                </div>
            </div>
        </DashBoardModal>

    </>;
};

export default DeleteUser;