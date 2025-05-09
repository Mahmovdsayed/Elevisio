import { usePreventZoom } from "@/hooks/usePreventZoom";
import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";

interface DatePickerFieldNestProps {
    name: string;
    isDisabled?: boolean
    label: string;
    defaultValue?: string;
    value: string | undefined;
    onChange: (value: string) => void;
    onBlur: () => void;
    description?: string;
    isRequired?: boolean;
}

const DatePickerFieldNest = ({
    description,
    name,
    label,
    defaultValue,
    value,
    onChange,
    isRequired,
    onBlur,
    isDisabled
}: DatePickerFieldNestProps) => {
    const isValidDate = (dateString: string | undefined) => {
        if (!dateString) return false;
        return !isNaN(new Date(dateString).getTime());
    };

    const defaultDateValue = defaultValue && isValidDate(defaultValue)
        ? parseDate(new Date(defaultValue).toISOString().split("T")[0])
        : null;

    const formattedDate = value && isValidDate(value)
        ? parseDate(new Date(value).toISOString().split("T")[0])
        : defaultDateValue;
    usePreventZoom();

    return (
        <DatePicker
            isRequired={isRequired}
            showMonthAndYearPickers
            label={label}
            variant="flat"
            isDisabled={isDisabled}
            defaultValue={defaultDateValue}
            size="sm"
            className="mb-1"
            description={description}
            radius="md"
            value={formattedDate}
            onChange={(dateValue) => {
                const formattedDate = dateValue
                    ? `${dateValue.year}-${String(dateValue.month).padStart(2, "0")}-${String(
                        dateValue.day
                    ).padStart(2, "0")}`
                    : "";
                onChange(formattedDate);
            }}
            onBlur={onBlur}
        />
    );
};

export default DatePickerFieldNest;