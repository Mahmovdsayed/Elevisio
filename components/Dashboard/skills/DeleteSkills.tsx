'use client'

import { deleteSkill } from "@/app/actions/skills/deleteSkills.action";
import useHandleResponse from "@/hooks/useHandleResponse";
import { Button } from "@heroui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
    skillID: string
}
const DeleteSkills = ({ skillID }: IProps) => {
    const [Loading, setLoading] = useState(false);
    const handleResponse = useHandleResponse();

    const deleteNow = async () => {
        setLoading(true)
        await handleResponse(deleteSkill(skillID))
        setLoading(false)
    }
    return <>
        <Button
            variant="faded"
            color="danger"
            isIconOnly
            size="sm"
            onPress={deleteNow}
            isLoading={Loading}
            isDisabled={Loading}
        >
            <FaTrash />
        </Button>
    </>;
};

export default DeleteSkills;