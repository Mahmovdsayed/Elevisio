'use client'

import { colors } from "@/types/colors.types";
import { Button } from "@heroui/react";

interface IProps {
    title: string
    startContent?: React.ReactNode
    className?: string
    onPress?: () => void
    color?: colors,
    variant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "ghost"
    size?: "sm" | "md" | "lg"
    radius?: "sm" | "md" | "lg" | "full"
}
const AddNewOrUpdateButton = ({ title, startContent, className, onPress, color, variant = "flat", size = "sm", radius = "sm" }: IProps) => {
    return <>
        <Button
            size={size}
            radius={radius}
            variant={variant}
            className={className}
            color={color}
            startContent={startContent}
            onPress={onPress}
        >
            {title}
        </Button>
    </>;
};

export default AddNewOrUpdateButton;