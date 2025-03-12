'use client'
import { Input } from "@heroui/react";
import NestErrors from "./NestErrors";

interface IProps {
    type: string;
    name: string;
    placeholder: string;
    accept?: boolean;
    value?: string;
    label: string;
    description: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

const FormInput = ({ onChange, onBlur, type, name, placeholder, label, description, value, accept }: IProps) => {

    return <>
        <Input
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            type={type}
            name={name}
            variant="underlined"
            color="default"
            placeholder={placeholder}
            accept={accept ? "image/*" : ""}
            label={label}
            labelPlacement="inside"
            className="mb-1"
            isRequired
            radius="md"
            size="md"
            description={description}
        />

    </>

};

export default FormInput;
