'use client'

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Input } from "@heroui/react";
import { useState } from "react";

interface IProps {
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}
const FormInputPassword = ({ placeholder, onBlur, onChange, value, name }: IProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return <>
        <Input
            onBlur={onBlur}
            name={name}
            variant="underlined"
            color="default"
            value={value}
            placeholder={placeholder}
            label="Password"
            labelPlacement="inside"
            className="mb-1"
            isRequired
            radius="md"
            size="md"
            description="Create a strong password with at least 6 characters, including uppercase, lowercase, and numbers."
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                >
                    {isVisible ? (
                        <EyeSlashFilledIcon />
                    ) : (
                        <EyeFilledIcon />
                    )}
                </button>
            }
            type={isVisible ? "text" : "password"}
            onChange={onChange}
        />
    </>;
};

export default FormInputPassword;