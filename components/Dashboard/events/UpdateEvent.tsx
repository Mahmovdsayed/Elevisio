'use client'
import { updateEvent } from "@/app/actions/event/updateEvent.action";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { EventData } from "@/types/event.types";
import { EventUpdateValidationSchema } from "@/Validation/updateEventValidation";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

interface IProps {
    id: string
    data: EventData
}
const UpdateEvent = ({ id, data }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();

    const initialValues = {
        name: data.name || "",
        description: data.description || "",
        shortDescription: data.shortDescription || "",
        ageRestriction: data.ageRestriction || "",
        category: data.category || "",
        currency: data.currency || "",
        status: data.status || "",

    } as EventData

    const formik = useFormHandler(initialValues, EventUpdateValidationSchema as any, async (values) => {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("shortDescription", values.shortDescription);
        formData.append("ageRestriction", values.ageRestriction);
        formData.append("category", values.category);
        formData.append("currency", values.currency);
        formData.append("status", values.status);
        formData.append("eventID", id);

        await handleResponse(updateEvent(formData))
        handleCloseModal();

    })

    return <>
        <AddNewOrUpdateButton
            title="Update"
            className="w-full font-medium"
            variant="faded"
            onPress={handleOpenModal}
            color="primary"
            startContent={<FaEdit />}
            radius="md"
            size="md"
        />
        <DashBoardModal
            submitButtonDisabled={formik.isSubmitting}
            submitButtonLoading={formik.isSubmitting}
            submitButtonText="Update Event"
            onButtonPress={formik.handleSubmit}
            startContent={<IoMdAdd />}
            title={`Update ${data.name} Event`}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            description="Update the event details by modifying the fields below."
        >
            <form className="flex flex-col gap-1" onSubmit={formik.handleSubmit}>
                <FormMotion delay={0.2}>
                    <FormInput
                        onBlur={formik.handleBlur}
                        label="Event Name"
                        placeholder="Enter event name"
                        name="name"
                        size="sm"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        variant="flat"
                        isRequired={true}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <NestErrors title={formik.errors.name} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <FormTextArea

                        onBlur={formik.handleBlur}
                        label="Event Description"
                        placeholder="Enter event description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        isRequired={true}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <NestErrors title={formik.errors.description} color='warning' />
                    )}
                </FormMotion>
                <FormMotion delay={0.3}>
                    <FormTextArea
                        onBlur={formik.handleBlur}
                        label="Event short Description"
                        placeholder="Enter event short Description"
                        name="shortDescription"
                        value={formik.values.shortDescription}
                        onChange={formik.handleChange}
                        isRequired={true}
                    />
                    {formik.touched.shortDescription && formik.errors.shortDescription && (
                        <NestErrors title={formik.errors.shortDescription} color='warning' />
                    )}
                </FormMotion>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.4}>
                        <Select
                            size='sm'
                            variant='flat'
                            radius="md"
                            label="Age Restriction"
                            placeholder="Select age restriction"
                            name="ageRestriction"
                            selectedKeys={[formik.values.ageRestriction]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <SelectItem key="all">All Ages</SelectItem>
                            <SelectItem key="18+">18+ Only</SelectItem>
                            <SelectItem key="21+">21+ Only</SelectItem>
                        </Select>
                        {formik.touched.ageRestriction && formik.errors.ageRestriction && (
                            <NestErrors title={formik.errors.ageRestriction} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.5}>
                        <Select
                            placeholder="Select Category"
                            isRequired
                            label="Category"
                            size="sm"
                            radius="md"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            selectedKeys={[formik.values.category]}
                            value={formik.values.category}
                            labelPlacement="inside"
                            name="category"
                        >
                            <SelectItem key={"conference"} id="conference">Conference</SelectItem>
                            <SelectItem key={"workshop"} id="workshop">Workshop</SelectItem>
                            <SelectItem key={"concert"} id="concert">Concert</SelectItem>
                            <SelectItem key={"exhibition"} id="exhibition">Exhibition</SelectItem>
                            <SelectItem key={"networking"} id="networking">Networking</SelectItem>
                            <SelectItem key={"sports"} id="sports">Sports</SelectItem>
                            <SelectItem key={"other"} id="other">Other</SelectItem>
                        </Select>
                        {formik.touched.category && formik.errors.category && (
                            <NestErrors title={formik.errors.category} color='warning' />
                        )}
                    </FormMotion>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <FormMotion delay={0.6}>
                        <FormInput
                            onBlur={formik.handleBlur}
                            label="Currency"
                            size='sm'
                            placeholder="Enter currency"
                            name="currency"
                            type="text"
                            value={formik.values.currency}
                            onChange={formik.handleChange}
                            variant="flat"
                            isRequired={true}
                        />
                        {formik.touched.currency && formik.errors.currency && (
                            <NestErrors title={formik.errors.currency} color='warning' />
                        )}
                    </FormMotion>
                    <FormMotion delay={0.7}>
                        <Select
                            placeholder="Select Status"
                            isRequired
                            label="Status"
                            size="sm"
                            radius="md"
                            variant="flat"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.status}
                            selectedKeys={[formik.values.status]}
                            labelPlacement="inside"
                            name="status"
                        >
                            <SelectItem key={"draft"} id="draft">Draft</SelectItem>
                            <SelectItem key={"published"} id="published">Published</SelectItem>
                            <SelectItem key={"cancelled"} id="cancelled">Cancelled</SelectItem>
                            <SelectItem key={"postponed"} id="postponed">Postponed</SelectItem>
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                            <NestErrors title={formik.errors.status} color='warning' />
                        )}
                    </FormMotion>
                </div>
            </form>
        </DashBoardModal>

    </>;
};

export default UpdateEvent;