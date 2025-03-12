'use client';

import { Alert } from "@heroui/react";

type colors =
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;

interface IProps {
    title?: string | null;
    color?: colors;
}

const NestErrors = ({ title, color = "default" }: IProps) => {
    if (!title) return null;

    return (
        <Alert radius="md" className="mb-1" color={color} title={title} />
    );
};

export default NestErrors;