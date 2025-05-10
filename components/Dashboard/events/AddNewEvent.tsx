'use client'

import { useState } from 'react';
import FormMotion from "@/components/motion/FormMotion";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import VerticalSteps from "@/components/Ui/VerticalSteps";
import { Divider, Button, SelectItem, Select, Checkbox } from "@heroui/react";
import useFormHandler from '@/hooks/useFormHandler';
import { initialEventValues } from '@/services/InitialState';
import { EventValidationSchema } from '@/Validation/EventValidation';
import NestErrors from '@/components/Ui/NestErrors';
import DatePickerFieldNest from '@/components/Ui/DatePickerField';
import { compressImage } from '@/functions/compressImage';
import { AddToast } from '@/functions/AddToast';
import { IoMdAdd } from 'react-icons/io';
import { FaTrash } from 'react-icons/fa';
import { getIn } from 'formik';
import useHandleResponse from '@/hooks/useHandleResponse';
import { AddEvent } from '@/app/actions/event/addEvent.action';


const AddNewEvent = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const handleResponse = useHandleResponse();

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "banner");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue("eventBanner", compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };

    const handleSquareChange = async (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const compressedImage = await compressImage(file, "default");
            if (!compressedImage) throw new Error("Failed to compress image");
            const compressedFile = new File([file], file.name, { type: file.type });

            formik.setFieldValue(name, compressedFile);
        } catch (error) {
            AddToast("Failed to upload image. Please try again.", 5000, "danger");
        }
    };


    const formik = useFormHandler(initialEventValues, EventValidationSchema as any, async (values) => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            const formData = new FormData();

            // Basic Information
            formData.append("name", values.name);
            formData.append("description", values.description);
            formData.append("shortDescription", values.shortDescription);
            formData.append("status", values.status);
            formData.append("category", values.category);

            // Date & Time
            formData.append("dateTime.start", values.dateTime.start);
            formData.append("dateTime.end", values.dateTime.end);

            // Location
            formData.append("location.venue", values.location.venue);
            formData.append("location.address", values.location.address);
            formData.append("location.country", values.location.country);
            formData.append("location.city", values.location.city);
            formData.append("location.meetingLink", values.location.meetingLink);
            formData.append("location.onlineEvent", JSON.stringify(values.location.onlineEvent));

            // Tickets & Pricing
            formData.append("currency", values.currency);
            formData.append("isFree", JSON.stringify(values.isFree));
            if (!values.isFree) {
                formData.append("ticketTypes", JSON.stringify(values.ticketTypes));
            }

            // Organizer
            formData.append("organizer.name", values.organizer.name);
            formData.append("organizer.email", values.organizer.email);
            formData.append("organizer.phone", values.organizer.phone);
            formData.append("organizer.bio", values.organizer.bio);
            formData.append("organizer.website", values.organizer.website);
            formData.append("organizer.socialMedia", JSON.stringify(values.organizer.socialMedia));

            // Registration
            formData.append("registration.status", values.registration.status);
            formData.append("registration.closeDate", values.registration.closeDate);
            formData.append("registration.externalLink", values.registration.externalLink);

            // Media
            if (values.eventBanner instanceof File) {
                formData.append("eventBanner", values.eventBanner);
            }
            if (values.organizer.image instanceof File) {
                formData.append("organizerImage", values.organizer.image);
            }

            // Additional Settings
            formData.append("termsConditions", values.termsConditions);
            formData.append("refundPolicy", values.refundPolicy);
            formData.append("ageRestriction", values.ageRestriction);

            // Speakers
            formData.append("speakers", JSON.stringify(values.speakers.map(speaker => ({
                name: speaker.name,
                bio: speaker.bio,
                socialMedia: speaker.socialMedia,
            }))));


            // Sponsors
            formData.append("sponsors", JSON.stringify(values.sponsors.map(sponsor => ({
                name: sponsor.name,
                tier: sponsor.tier,
                website: sponsor.website,
            }))));



            // FAQs
            formData.append("faqs", JSON.stringify(values.faqs));




            await handleResponse(AddEvent(formData), formik.resetForm)
        }
    })
    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };



    return (
        <>
            <Divider />
            <div className="flex flex-col md:flex-row gap-8 w-full my-4">
                <div className="w-full md:w-1/3">
                    <VerticalSteps
                        currentStep={currentStep}
                        onStepChange={setCurrentStep}
                        steps={[
                            {
                                title: "Basic Information",
                                description: "Name, Description, Category"
                            },
                            {
                                title: "Date & Location",
                                description: "Dates, Venue, Online/Offline"
                            },
                            {
                                title: "Media & Tickets",
                                description: "Banner, Ticket Types/Pricing"
                            },
                            {
                                title: "Registration & organizer",
                                description: "Registration Type, Organizer Info"
                            },
                            {
                                title: "Additional Settings",
                                description: "Terms, Refund Policy, Age Restrictions"
                            },
                        ]}
                    />
                </div>

                <div className="w-full md:w-2/3">
                    <form onSubmit={formik.handleSubmit} >
                        {currentStep === 0 && (
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                                <FormMotion delay={0.2}>
                                    <FormInput
                                        onBlur={formik.handleBlur}
                                        label="Event Name"
                                        placeholder="Enter event name"
                                        name="name"
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
                                            className="w-full mb-1"
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
                                            className="w-full mb-1"
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
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold mb-4">Date & Location</h2>
                                <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row items-center justify-between gap-2">
                                    <FormMotion delay={0.2}>
                                        <DatePickerFieldNest
                                            isRequired={true}
                                            label="Event Date"
                                            description='Enter the date of the event'
                                            name="from"
                                            onChange={(value) =>
                                                formik.setFieldValue("dateTime", {
                                                    ...formik.values.dateTime,
                                                    start: value,
                                                })
                                            }
                                            onBlur={() => formik.handleBlur("dateTime.start")}
                                            value={formik.values.dateTime.start}
                                        />
                                        {formik.touched.dateTime?.start && formik.errors.dateTime?.start && (
                                            <NestErrors title={formik.errors.dateTime?.start} color='warning' />
                                        )}
                                    </FormMotion>
                                    <FormMotion delay={0.3}>
                                        <DatePickerFieldNest
                                            isRequired={true}
                                            label="End Date"
                                            description='Select the date when the event should end.'
                                            name="from"
                                            onChange={(value) =>
                                                formik.setFieldValue("dateTime", {
                                                    ...formik.values.dateTime,
                                                    end: value,
                                                })
                                            } onBlur={() => formik.handleBlur("dateTime.end")}
                                            value={formik.values.dateTime.end}
                                        />
                                        {formik.touched.dateTime?.end && formik.errors.dateTime?.end && (
                                            <NestErrors title={formik.errors.dateTime?.end} color='warning' />
                                        )}
                                    </FormMotion>
                                </div>
                                <FormMotion delay={0.4}>
                                    <Checkbox
                                        color="primary"
                                        size="sm"
                                        className="my-1 px-4 font-medium"
                                        name="onlineEvent"
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            formik.setFieldValue("location", {
                                                ...formik.values.location,
                                                onlineEvent: isChecked,
                                            })
                                        }}
                                        value={formik.values.location.onlineEvent as any}
                                    >
                                        Online Event
                                    </Checkbox>
                                </FormMotion>
                                {formik.values.location.onlineEvent && (
                                    <FormMotion delay={0.5}>
                                        <FormInput
                                            onBlur={formik.handleBlur}
                                            label="Online Event URL"
                                            placeholder="Enter online event URL"
                                            name="meetingLink"
                                            type="text"
                                            value={formik.values.location.meetingLink}
                                            onChange={(e) => {
                                                formik.setFieldValue("location", {
                                                    ...formik.values.location,
                                                    meetingLink: e.target.value,
                                                })
                                            }}
                                            variant="flat"
                                            isRequired={true}
                                        />
                                        {formik.touched.location?.meetingLink && formik.errors.location?.meetingLink && (
                                            <NestErrors title={formik.errors.location?.meetingLink} color='warning' />
                                        )}
                                    </FormMotion>
                                )}
                                {!formik.values.location.onlineEvent && (
                                    <>
                                        <FormMotion delay={0.5}>
                                            <FormInput
                                                onBlur={formik.handleBlur}
                                                label="Event Location"
                                                placeholder="Enter event location"
                                                name="venue"
                                                type="text"
                                                value={formik.values.location.venue}
                                                onChange={(e) => {
                                                    formik.setFieldValue("location", {
                                                        ...formik.values.location,
                                                        venue: e.target.value,
                                                    })
                                                }}
                                                variant="flat"
                                                isRequired={true}
                                            />
                                            {formik.touched.location?.venue && formik.errors.location?.venue && (
                                                <NestErrors title={formik.errors.location?.venue} color='warning' />
                                            )}
                                        </FormMotion>
                                        <FormMotion delay={0.6}>
                                            <FormInput
                                                onBlur={formik.handleBlur}
                                                label="Event address"
                                                placeholder="Enter event address"
                                                name="address"
                                                type="text"
                                                value={formik.values.location.address}
                                                onChange={(e) => {
                                                    formik.setFieldValue("location", {
                                                        ...formik.values.location,
                                                        address: e.target.value,
                                                    })
                                                }}
                                                variant="flat"
                                                isRequired={true}
                                            />
                                            {formik.touched.location?.address && formik.errors.location?.address && (
                                                <NestErrors title={formik.errors.location?.address} color='warning' />
                                            )}
                                        </FormMotion>
                                        <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row items-center justify-between gap-2">
                                            <FormMotion delay={0.7}>
                                                <FormInput
                                                    onBlur={formik.handleBlur}
                                                    label="Event country"
                                                    placeholder="Enter event country"
                                                    name="country"
                                                    type="text"
                                                    value={formik.values.location.country}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("location", {
                                                            ...formik.values.location,
                                                            country: e.target.value,
                                                        })
                                                    }}
                                                    variant="flat"
                                                    isRequired={true}
                                                />
                                                {formik.touched.location?.country && formik.errors.location?.country && (
                                                    <NestErrors title={formik.errors.location?.country} color='warning' />
                                                )}
                                            </FormMotion>
                                            <FormMotion delay={0.8}>
                                                <FormInput
                                                    onBlur={formik.handleBlur}
                                                    label="Event city"
                                                    placeholder="Enter event city"
                                                    name="city"
                                                    type="text"
                                                    value={formik.values.location.city}
                                                    onChange={(e) => {
                                                        formik.setFieldValue("location", {
                                                            ...formik.values.location,
                                                            city: e.target.value,
                                                        })
                                                    }}
                                                    variant="flat"
                                                    isRequired={true}
                                                />
                                                {formik.touched.location?.city && formik.errors.location?.city && (
                                                    <NestErrors title={formik.errors.location?.city} color='warning' />
                                                )}
                                            </FormMotion>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold mb-4">Media & Tickets</h2>

                                <FormMotion delay={0.2}>
                                    <FormInput
                                        type="file"
                                        isRequired={false}
                                        label="Upload Event Banner"
                                        name="eventBanner"
                                        accept
                                        placeholder="Upload Event Banner"
                                        onBlur={formik.handleBlur}
                                        onChange={handleImageChange}
                                        variant="flat"
                                        description="For best results, please upload a image (1920x1080 pixels). Supported formats: PNG, JPEG, JPG."
                                        size="sm"
                                    />
                                    {formik.touched.eventBanner && formik.errors.eventBanner && (
                                        <NestErrors title={formik.errors.eventBanner} color='warning' />
                                    )}
                                </FormMotion>

                                <FormMotion delay={0.3}>
                                    <Checkbox
                                        color="primary"
                                        size="sm"
                                        className="my-1 px-4 font-medium"
                                        name="isFree"
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            formik.setFieldValue("isFree", isChecked);
                                            if (isChecked) {
                                                formik.setFieldValue("ticketTypes", []);
                                            }
                                        }}
                                        isSelected={formik.values.isFree}
                                    >
                                        Free Event
                                    </Checkbox>
                                </FormMotion>

                                {!formik.values.isFree && (
                                    <div className="space-y-4 mt-2">
                                        <div>
                                            <FormMotion delay={0.1}>
                                                <FormInput
                                                    onBlur={formik.handleBlur}
                                                    label="Currency"
                                                    size='sm'
                                                    placeholder="Enter currency"
                                                    description='Specify the currency for ticket sales (e.g., USD, EUR).'
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
                                        </div>
                                        {formik.values.ticketTypes.map((ticket, index) => (
                                            <div key={index} className="border-divider border p-4 rounded-lg relative">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-medium">Ticket #{index + 1}: {ticket.name || 'New Ticket'}</h3>
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        startContent={<FaTrash />}
                                                        color="danger"
                                                        onPress={() => {
                                                            const updatedTickets = [...formik.values.ticketTypes];
                                                            updatedTickets.splice(index, 1);
                                                            formik.setFieldValue("ticketTypes", updatedTickets);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormMotion delay={0.2}>
                                                        <FormInput
                                                            onBlur={formik.handleBlur}
                                                            name='name'
                                                            type='text'
                                                            label="Ticket Name"
                                                            placeholder="Enter ticket name"
                                                            size='sm'
                                                            description='Enter a descriptive name for this ticket type (e.g., "General Admission", "VIP").'
                                                            value={ticket.name}
                                                            variant='underlined'
                                                            onChange={(e) => {
                                                                const updatedTickets = [...formik.values.ticketTypes];
                                                                updatedTickets[index].name = e.target.value;
                                                                formik.setFieldValue("ticketTypes", updatedTickets);
                                                            }}
                                                            isRequired
                                                        />
                                                        {(() => {
                                                            const nameTouched = getIn(formik.touched, `ticketTypes[${index}].name`);
                                                            const nameError = getIn(formik.errors, `ticketTypes[${index}].name`);
                                                            return nameTouched && nameError ? (
                                                                <NestErrors title={nameError} color="warning" />
                                                            ) : null;
                                                        })()}
                                                    </FormMotion>
                                                    <FormMotion delay={0.3}>

                                                        <FormInput
                                                            name='price'
                                                            onBlur={formik.handleBlur}
                                                            label="Price"
                                                            placeholder="0.00"
                                                            size='sm'
                                                            description='Enter the price for this ticket type.'
                                                            isRequired
                                                            type="number"
                                                            value={ticket.price as any}
                                                            variant='underlined'
                                                            onChange={(e) => {
                                                                const updatedTickets = [...formik.values.ticketTypes];
                                                                updatedTickets[index].price = parseFloat(e.target.value) || 0;
                                                                formik.setFieldValue("ticketTypes", updatedTickets);
                                                            }}

                                                        />
                                                        {(() => {
                                                            const priceTouched = getIn(formik.touched, `ticketTypes[${index}].price`);
                                                            const priceError = getIn(formik.errors, `ticketTypes[${index}].price`);
                                                            return priceTouched && priceError ? (
                                                                <NestErrors title={priceError} color="warning" />
                                                            ) : null;
                                                        })()}
                                                    </FormMotion>

                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            color="primary"
                                            size='sm'
                                            startContent={<IoMdAdd />}
                                            variant="flat"
                                            onPress={() => {
                                                formik.setFieldValue("ticketTypes", [
                                                    ...formik.values.ticketTypes,
                                                    {
                                                        name: "",
                                                        price: 0,
                                                    }
                                                ]);
                                            }}
                                            className="mt-2"
                                        >
                                            Add Another Ticket Type
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Registration & Organizer</h2>
                                <div className="flex flex-col gap-1">
                                    <FormMotion delay={0.2}>
                                        <FormInput
                                            onBlur={formik.handleBlur}
                                            label="Event URL"
                                            placeholder="Enter event URL"
                                            description="Add the URL of your event hosted on an external platform like TicketsMarche, Eventbrite, or similar. Attendees will use this link to reserve their spot or purchase tickets."

                                            name="registration.externalLink"
                                            type="text"
                                            value={formik.values.registration.externalLink}
                                            onChange={formik.handleChange}
                                            variant="flat"
                                            isRequired={true}
                                        />
                                        {formik.touched.registration?.externalLink && formik.errors.registration?.externalLink && (
                                            <NestErrors title={formik.errors.registration?.externalLink} color='warning' />
                                        )}
                                    </FormMotion>
                                    <div className="flex items-center justify-between gap-2">
                                        <FormMotion delay={0.3}>
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
                                                selectedKeys={[formik.values.registration?.status]}
                                                className="w-full mb-1"
                                                labelPlacement="inside"
                                                name="registration.status"
                                            >
                                                <SelectItem key={"open"} id="open">Open</SelectItem>
                                                <SelectItem key={"closed"} id="closed">Closed</SelectItem>
                                                <SelectItem key={"soldout"} id="soldout">Soldout</SelectItem>
                                            </Select>
                                            {formik.touched.registration?.status && formik.errors.registration?.status && (
                                                <NestErrors title={formik.errors.registration?.status} color='warning' />
                                            )}
                                        </FormMotion>
                                        <FormMotion delay={0.4}>
                                            <DatePickerFieldNest
                                                isRequired={true}
                                                label="Registration Close Date"
                                                name="registration.closeDate"
                                                onChange={(value) =>
                                                    formik.setFieldValue("registration", {
                                                        ...formik.values.registration,
                                                        closeDate: value,
                                                    })
                                                }
                                                onBlur={() => formik.handleBlur("registration.closeDate")}
                                                value={formik.values.registration?.closeDate}
                                            />
                                            {formik.touched.registration?.closeDate && formik.errors.registration?.closeDate && (
                                                <NestErrors title={formik.errors.registration?.closeDate} color='warning' />
                                            )}
                                        </FormMotion>
                                    </div>
                                    <Divider className='my-4' />
                                    <FormMotion delay={0.5}>
                                        <FormInput
                                            name="organizer.name"
                                            type="text"
                                            label="Organizer Name"
                                            placeholder="Enter organizer name"
                                            size='sm'
                                            onChange={formik.handleChange}
                                            value={formik.values.organizer?.name}
                                            variant='flat'
                                            isRequired={true}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.organizer?.name && formik.errors.organizer?.name && (
                                            <NestErrors title={formik.errors.organizer?.name} color='warning' />
                                        )}
                                    </FormMotion>
                                    <div className="flex items-center justify-between gap-2">
                                        <FormMotion delay={0.6}>
                                            <FormInput
                                                name="organizer.email"
                                                type="email"
                                                label="Organizer Email"
                                                placeholder="Enter organizer email"
                                                size='sm'
                                                onChange={formik.handleChange}
                                                value={formik.values.organizer?.email}
                                                variant='flat'
                                                isRequired={true}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.organizer?.email && formik.errors.organizer?.email && (
                                                <NestErrors title={formik.errors.organizer?.email} color='warning' />
                                            )}
                                        </FormMotion>
                                        <FormMotion delay={0.7}>
                                            <FormInput
                                                name="organizer.phone"
                                                type="text"
                                                label="Organizer Phone"
                                                placeholder="Enter organizer phone"
                                                size='sm'
                                                onChange={formik.handleChange}
                                                value={formik.values.organizer?.phone}
                                                variant='flat'
                                                isRequired={true}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.organizer?.phone && formik.errors.organizer?.phone && (
                                                <NestErrors title={formik.errors.organizer?.phone} color='warning' />
                                            )}
                                        </FormMotion>


                                    </div>
                                    <FormMotion delay={0.8}>
                                        <FormTextArea
                                            onBlur={formik.handleBlur}
                                            label="Event organizer Biography"
                                            placeholder="Enter Event organizer Biography"
                                            name="organizer.bio"
                                            value={formik.values.organizer?.bio}
                                            onChange={formik.handleChange}
                                        />
                                        {formik.touched.organizer?.bio && formik.errors.organizer?.bio && (
                                            <NestErrors title={formik.errors.organizer?.bio} color='warning' />
                                        )}
                                    </FormMotion>
                                    <Divider className='my-4' />
                                    <FormMotion delay={0.9}>
                                        <FormInput
                                            name="organizer.website"
                                            type="text"
                                            label="Organizer Website"
                                            placeholder="Enter organizer website"
                                            size='sm'
                                            onChange={formik.handleChange}
                                            value={formik.values.organizer?.website}
                                            variant='flat'
                                            isRequired={false}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.organizer?.website && formik.errors.organizer?.website && (
                                            <NestErrors title={formik.errors.organizer?.website} color='warning' />
                                        )}

                                    </FormMotion>
                                    <div className="flex items-center justify-between gap-2">
                                        <FormMotion delay={1}>
                                            <FormInput
                                                name="organizer.socialMedia.instagram"
                                                type="text"
                                                label="Instagram Link"
                                                placeholder="Enter Organizer Instagram Link"
                                                size='sm'
                                                onChange={formik.handleChange}
                                                value={formik.values.organizer.socialMedia.instagram}
                                                variant='flat'
                                                isRequired={false}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.organizer?.socialMedia?.instagram && formik.errors.organizer?.socialMedia?.instagram && (
                                                <NestErrors title={formik.errors.organizer?.socialMedia?.instagram} color='warning' />
                                            )}
                                        </FormMotion>
                                        <FormMotion delay={1.1}>
                                            <FormInput
                                                name="organizer.socialMedia.facebook"
                                                type="text"
                                                label="Facebook Link"
                                                placeholder="Enter Organizer Facebook Link"
                                                size='sm'
                                                onChange={formik.handleChange}
                                                value={formik.values.organizer.socialMedia.facebook}
                                                variant='flat'
                                                isRequired={false}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.organizer?.socialMedia?.facebook && formik.errors.organizer?.socialMedia?.facebook && (
                                                <NestErrors title={formik.errors.organizer?.socialMedia?.facebook} color='warning' />
                                            )}
                                        </FormMotion>
                                    </div>
                                    <FormMotion delay={1.2}>
                                        <FormInput
                                            type="file"
                                            isRequired={false}
                                            label="Upload organizer Image"
                                            name="organizer.image"
                                            accept
                                            placeholder="Upload Event Banner"
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => { handleSquareChange(e, "organizer.image") }}
                                            variant="flat"
                                            description="For best results, please upload a image (500x500 pixels). Supported formats: PNG, JPEG, JPG."
                                            size="sm"
                                        />
                                    </FormMotion>
                                </div>
                            </div>
                        )}


                        {currentStep === 4 && (
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-semibold mb-4">Additional Settings</h2>

                                <FormMotion delay={0.2}>
                                    <FormTextArea
                                        label="Terms & Conditions"
                                        placeholder="Enter event terms and conditions"
                                        name="termsConditions"
                                        value={formik.values.termsConditions}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.termsConditions && formik.errors.termsConditions && (
                                        <NestErrors title={formik.errors.termsConditions} color='warning' />
                                    )}
                                </FormMotion>

                                <FormMotion delay={0.3}>
                                    <FormTextArea
                                        label="Refund Policy"
                                        placeholder="Enter event refund policy"
                                        name="refundPolicy"
                                        value={formik.values.refundPolicy}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.refundPolicy && formik.errors.refundPolicy && (
                                        <NestErrors title={formik.errors.refundPolicy} color='warning' />
                                    )}
                                </FormMotion>

                                <FormMotion delay={0.4}>
                                    <Select
                                        size='sm'
                                        variant='flat'
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
                                <Divider className='my-4' />
                                <FormMotion delay={0.5}>
                                    <div className="space-y-4">
                                        <h3 className="font-medium">Speakers</h3>
                                        {formik.values.speakers.map((speaker, index) => (
                                            <div key={index} className="border-divider border p-4 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4>Speaker #{index + 1}</h4>
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="danger"
                                                        startContent={<FaTrash />}
                                                        onPress={() => {
                                                            const updatedSpeakers = [...formik.values.speakers];
                                                            updatedSpeakers.splice(index, 1);
                                                            formik.setFieldValue("speakers", updatedSpeakers);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>

                                                <FormInput
                                                    name='speaker.name'
                                                    type='text'
                                                    size='sm'
                                                    variant='flat'
                                                    label="Speaker Name"
                                                    placeholder="Enter speaker name"
                                                    value={speaker.name}
                                                    onChange={(e) => {
                                                        const updatedSpeakers = [...formik.values.speakers];
                                                        updatedSpeakers[index].name = e.target.value;
                                                        formik.setFieldValue("speakers", updatedSpeakers);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                    isRequired
                                                />
                                                {getIn(formik.touched, `speakers[${index}].name`) &&
                                                    getIn(formik.errors, `speakers[${index}].name`) && (
                                                        <NestErrors
                                                            title={getIn(formik.errors, `speakers[${index}].name`)}
                                                            color="warning"
                                                        />
                                                    )}

                                                <FormTextArea
                                                    name='speaker.bio'
                                                    label="Speaker Bio"
                                                    placeholder="Enter speaker biography"
                                                    value={speaker.bio}
                                                    onChange={(e) => {
                                                        const updatedSpeakers = [...formik.values.speakers];
                                                        updatedSpeakers[index].bio = e.target.value;
                                                        formik.setFieldValue("speakers", updatedSpeakers);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {getIn(formik.touched, `speakers[${index}].bio`) &&
                                                    getIn(formik.errors, `speakers[${index}].bio`) && (
                                                        <NestErrors
                                                            title={getIn(formik.errors, `speakers[${index}].bio`)}
                                                            color="warning"
                                                        />
                                                    )}

                                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <FormInput
                                                        name='speaker.socialMedia.instagram'
                                                        type='text'
                                                        variant='flat'
                                                        size='sm'
                                                        label="Instagram"
                                                        placeholder="https://instagram.com/username"
                                                        value={speaker.socialMedia.instagram}
                                                        onChange={(e) => {
                                                            const updatedSpeakers = [...formik.values.speakers];
                                                            updatedSpeakers[index].socialMedia.instagram = e.target.value;
                                                            formik.setFieldValue("speakers", updatedSpeakers);
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {getIn(formik.touched, `speakers[${index}].socialMedia.instagram`) &&
                                                        getIn(formik.errors, `speakers[${index}].socialMedia.instagram`) && (
                                                            <NestErrors
                                                                title={getIn(formik.errors, `speakers[${index}].socialMedia.instagram`)
                                                                }
                                                                color="warning"
                                                            />
                                                        )}

                                                    <FormInput
                                                        name='speaker.socialMedia.facebook'
                                                        type='text'
                                                        variant='flat'
                                                        size='sm'
                                                        label="Instagram"
                                                        placeholder="https://facebook.com/username"
                                                        value={speaker.socialMedia.facebook}
                                                        onChange={(e) => {
                                                            const updatedSpeakers = [...formik.values.speakers];
                                                            updatedSpeakers[index].socialMedia.facebook = e.target.value;
                                                            formik.setFieldValue("speakers", updatedSpeakers);
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                    {getIn(formik.touched, `speakers[${index}].socialMedia.facebook`) &&
                                                        getIn(formik.errors, `speakers[${index}].socialMedia.facebook`) && (
                                                            <NestErrors
                                                                title={getIn(formik.errors, `speakers[${index}].socialMedia.facebook`)
                                                                }
                                                                color="warning"
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            color="primary"
                                            variant="flat"
                                            startContent={<IoMdAdd />}
                                            onPress={() => {
                                                formik.setFieldValue("speakers", [
                                                    ...formik.values.speakers,
                                                    {
                                                        name: "",
                                                        title: "",
                                                        bio: "",
                                                        image: null,
                                                        socialMedia: {
                                                            instagram: "",
                                                            linkedin: ""
                                                        }
                                                    }
                                                ]);
                                            }}
                                            className="mt-2"
                                        >
                                            Add Speaker
                                        </Button>
                                    </div>
                                </FormMotion>
                                <Divider className='my-4' />
                                <FormMotion delay={0.6}>
                                    <div className="space-y-4">
                                        <h3 className="font-medium">Sponsors</h3>
                                        {formik.values.sponsors.map((sponsor, index) => (
                                            <div key={index} className="border border-divider p-4 rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4>Sponsor #{index + 1}</h4>
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="danger"
                                                        startContent={<FaTrash />}
                                                        onPress={() => {
                                                            const updatedSponsors = [...formik.values.sponsors];
                                                            updatedSponsors.splice(index, 1);
                                                            formik.setFieldValue("sponsors", updatedSponsors);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>

                                                <div className="flex items-center justify-between gap-2 ">
                                                    <FormInput
                                                        name='sponsor.name'
                                                        type='text'
                                                        size='sm'
                                                        variant='flat'
                                                        label="Sponsor Name"
                                                        placeholder="Enter sponsor name"
                                                        value={sponsor.name}
                                                        onChange={(e) => {
                                                            const updatedSponsors = [...formik.values.sponsors];
                                                            updatedSponsors[index].name = e.target.value;
                                                            formik.setFieldValue("sponsors", updatedSponsors);
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                        isRequired
                                                    />
                                                    {getIn(formik.touched, `sponsors[${index}].name`) &&
                                                        getIn(formik.errors, `sponsors[${index}].name`) && (
                                                            <NestErrors
                                                                title={getIn(formik.errors, `sponsors[${index}].name`)}
                                                                color="warning"
                                                            />
                                                        )}

                                                    <Select
                                                        label="Sponsorship Tier"
                                                        size='sm'
                                                        className='mb-1'
                                                        variant='flat'
                                                        selectedKeys={[sponsor.tier]}
                                                        onChange={(e) => {
                                                            const updatedSponsors = [...formik.values.sponsors];
                                                            updatedSponsors[index].tier = e.target.value;
                                                            formik.setFieldValue("sponsors", updatedSponsors);
                                                        }}
                                                        onBlur={formik.handleBlur}
                                                    >
                                                        <SelectItem key="platinum">Platinum</SelectItem>
                                                        <SelectItem key="gold">Gold</SelectItem>
                                                        <SelectItem key="silver">Silver</SelectItem>
                                                        <SelectItem key="bronze">Bronze</SelectItem>
                                                    </Select>
                                                    {getIn(formik.touched, `sponsors[${index}].tier`) &&
                                                        getIn(formik.errors, `sponsors[${index}].tier`) && (
                                                            <NestErrors
                                                                title={getIn(formik.errors, `sponsors[${index}].tier`)}
                                                                color="warning"
                                                            />
                                                        )}

                                                </div>

                                                <FormInput
                                                    name='sponsor.website'
                                                    type='text'
                                                    size='sm'
                                                    variant='flat'
                                                    label="Website URL"
                                                    placeholder="https://example.com"
                                                    value={sponsor.website}
                                                    onChange={(e) => {
                                                        const updatedSponsors = [...formik.values.sponsors];
                                                        updatedSponsors[index].website = e.target.value;
                                                        formik.setFieldValue("sponsors", updatedSponsors);
                                                    }}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {getIn(formik.touched, `sponsors[${index}].website`) &&
                                                    getIn(formik.errors, `sponsors[${index}].website`) && (
                                                        <NestErrors
                                                            title={getIn(formik.errors, `sponsors[${index}].website`)}
                                                            color="warning"
                                                        />
                                                    )}
                                            </div>
                                        ))}

                                        <Button
                                            color="primary"
                                            variant="flat"
                                            startContent={<IoMdAdd />}
                                            onPress={() => {
                                                formik.setFieldValue("sponsors", [
                                                    ...formik.values.sponsors,
                                                    {
                                                        name: "",
                                                        tier: "silver",
                                                        website: "",
                                                        logo: null
                                                    }
                                                ]);
                                            }}
                                            className="mt-2"
                                        >
                                            Add Sponsor
                                        </Button>
                                    </div>
                                </FormMotion>
                                <Divider className='my-4' />
                                <FormMotion delay={0.8}>
                                    <div className="space-y-4">
                                        <h3 className="font-medium">FAQs</h3>
                                        {formik.values.faqs.map((faq, index) => (
                                            <div key={index} className="border-divider border p-4 rounded-lg">
                                                <FormInput
                                                    name='faq.question'
                                                    onBlur={formik.handleBlur}
                                                    placeholder='Enter question'
                                                    type='text'
                                                    size='sm'
                                                    variant='flat'
                                                    label="Question"
                                                    value={faq.question}
                                                    onChange={(e) => {
                                                        const updatedFaqs = [...formik.values.faqs];
                                                        updatedFaqs[index].question = e.target.value;
                                                        formik.setFieldValue("faqs", updatedFaqs);
                                                    }}
                                                />
                                                {getIn(formik.touched, `faqs[${index}].question`) &&
                                                    getIn(formik.errors, `faqs[${index}].question`) && (
                                                        <NestErrors
                                                            title={getIn(formik.errors, `faqs[${index}].question`)}
                                                            color="warning"
                                                        />
                                                    )}

                                                <FormTextArea
                                                    name='faq.answer'
                                                    onBlur={formik.handleBlur}
                                                    placeholder='Enter answer'
                                                    label="Answer"
                                                    value={faq.answer}
                                                    onChange={(e) => {
                                                        const updatedFaqs = [...formik.values.faqs];
                                                        updatedFaqs[index].answer = e.target.value;
                                                        formik.setFieldValue("faqs", updatedFaqs);
                                                    }}
                                                />
                                                {getIn(formik.touched, `faqs[${index}].answer`) &&
                                                    getIn(formik.errors, `faqs[${index}].answer`) && (
                                                        <NestErrors
                                                            title={getIn(formik.errors, `faqs[${index}].answer`)}
                                                            color="warning"
                                                        />
                                                    )}
                                            </div>
                                        ))}
                                        <Button onPress={() => {
                                            formik.setFieldValue("faqs", [
                                                ...formik.values.faqs,
                                                { question: "", answer: "" }
                                            ]);
                                        }}>
                                            Add FAQ
                                        </Button>
                                    </div>
                                </FormMotion>
                                <Divider className='my-4' />

                            </div>

                        )}

                        <div className="flex justify-between mt-4">
                            {currentStep > 0 && (
                                <Button
                                    onPress={prevStep}
                                    variant="flat"
                                    color="secondary"
                                >
                                    Back
                                </Button>
                            )}

                            {currentStep < 4 ? (
                                <Button
                                    type='button'
                                    onPress={nextStep}
                                    color="primary"
                                    className="ml-auto"
                                >
                                    Next
                                </Button>
                            ) : (
                                <Button
                                    type='submit'
                                    variant="flat"
                                    isDisabled={formik.isSubmitting}
                                    isLoading={formik.isSubmitting}
                                    color="primary"
                                    className="ml-auto"
                                >
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
};


export default AddNewEvent;