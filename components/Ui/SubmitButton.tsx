'use client'
import { Button } from "@heroui/react";

interface ButtonComponentProps {
    title: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    startContent?: React.ReactNode;
    className?: string;
    onPress?: () => void;
}

const SubmitButton: React.FC<ButtonComponentProps> = ({
    title,
    isLoading = false,
    isDisabled = false,
    startContent,
    className = "w-full",
    onPress
}) => {

    return (
        <Button
            isLoading={isLoading}
            isDisabled={isDisabled}
            startContent={startContent}
            type={"submit"}
            radius="md"
            size="md"
            variant="flat"
            className={`w-full ${className}`}
            onPress={onPress}
        >
            {title}
        </Button>
    );
};

export default SubmitButton;
