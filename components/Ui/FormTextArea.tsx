import { Textarea } from "@heroui/react";

interface IProps {
    name: string
    description: string
    label: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}
const FormTextArea = ({ name, description, label, placeholder, onChange, onBlur, value }: IProps) => {
    return <>
        <Textarea
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            variant="flat"
            color="default"
            className="mb-1 w-full"
            labelPlacement="inside"
            isRequired
            radius="md"
            size="md"
            description={description}
            label={label}
            placeholder={placeholder}
        />
    </>;
};

export default FormTextArea;