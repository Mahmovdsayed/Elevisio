import { usePreventZoom } from "@/hooks/usePreventZoom";
import { Textarea } from "@heroui/react";

interface IProps {
    name: string
    description?: string
    label: string
    value: string
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    isRequired?: boolean
}
const FormTextArea = ({ isRequired, name, description, label, placeholder, onChange, onBlur, value }: IProps) => {
    usePreventZoom();
    return <>

        <Textarea
            isRequired={isRequired}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            variant="flat"
            color="default"
            labelPlacement="inside"
            radius="md"
            className="mb-1 ios-no-zoom w-full"
            size="sm"
            description={description}
            label={label}
            placeholder={placeholder}
        />
    </>;
};

export default FormTextArea;