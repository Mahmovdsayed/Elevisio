import { updateUserInfo } from "@/app/actions/user/updateUserInfo";
import FormMotion from "@/components/motion/FormMotion";
import AddNewOrUpdateButton from "@/components/Ui/AddNewOrUpdateButton";
import DashBoardModal from "@/components/Ui/DashBoardModal";
import DatePickerFieldNest from "@/components/Ui/DatePickerField";
import FormInput from "@/components/Ui/FormInput";
import FormTextArea from "@/components/Ui/FormTextArea";
import NestErrors from "@/components/Ui/NestErrors";
import SubmitButton from "@/components/Ui/SubmitButton";
import useFormHandler from "@/hooks/useFormHandler";
import useHandleResponse from "@/hooks/useHandleResponse";
import { allCountries } from "@/static/allCountries";
import { UserInfoFormValues } from "@/types/Forms.types";
import { User } from "@/types/userInfo.types";
import { updateUserInfoSchema } from "@/Validation/UpdateUserInfoValidation";
import { Avatar, DatePicker, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";

interface IProps {
    data: User
}

const UpdateUserInfo = ({ data }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleResponse = useHandleResponse();
    const initialValues = {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        positionName: data.positionName || "",
        birthday: data.birthday && data.birthday !== "No birthday provided yet"
            ? data.birthday
            : "",
        phone: data.phone || "",
        website: data.website || "",
        gender: data.gender || "",
        about: data.about || "",
        country: data.country || "",
        nationality: data.nationality || "",
        city: data.city || "",
    };

    const formik = useFormHandler<UserInfoFormValues>(
        initialValues,
        updateUserInfoSchema as any,
        async (values) => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (key === "birthday" && value) {
                        const date = new Date(value);
                        const formattedDate = `${date.getMonth() + 1
                            }/${date.getDate()}/${date.getFullYear()}`;
                        formData.append(key, formattedDate);
                    } else {
                        formData.append(key, value as string);
                    }
                }
            });

            handleCloseModal();
            await handleResponse(updateUserInfo(formData));
        }
    );

    const handleCountryChange = (selectedCountry: string) => {
        const country = allCountries.find((c: any) => c.name.common === selectedCountry);
        if (country) {
            const nationality = country.demonyms?.eng?.m || "No nationality provided";
            formik.setFieldValue("nationality", nationality);
            formik.setFieldValue("country", selectedCountry);
        }
    };

    return (
        <>
            <AddNewOrUpdateButton
                title="Edit"
                startContent={<FaEdit />}
                className="w-full font-medium"
                onPress={handleOpenModal}
                color="default"
            />
            <DashBoardModal
                submitButtonDisabled={formik.isSubmitting}
                submitButtonLoading={formik.isSubmitting}
                submitButtonText="Save"
                startContent={<FaSave />}
                title="Edit User Info"
                isOpen={isModalOpen}
                onButtonPress={formik.handleSubmit}
                onClose={handleCloseModal}
            >
                <div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="w-full flex mx-auto flex-col gap-3"
                    >
                        <div className="flex items-center justify-between w-full gap-1">
                            <FormMotion delay={0.2}>
                                <FormInput
                                    isRequired={false}
                                    label="First Name"
                                    name="firstName"
                                    placeholder="Enter Your First Name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    defaultValue={data.firstName}
                                    type="text"
                                    size="sm"
                                    variant="flat"
                                />
                                {formik.errors.firstName && <NestErrors title={formik.errors.firstName} color="warning" />}
                            </FormMotion>
                            <FormMotion delay={0.3}>
                                <FormInput
                                    isRequired={false}
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Enter Your Last Name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    defaultValue={data.lastName}
                                    type="text"
                                    size="sm"
                                    variant="flat"
                                />
                                {formik.errors.lastName && <NestErrors title={formik.errors.lastName} color="warning" />}
                            </FormMotion>
                        </div>
                        <FormMotion delay={0.4}>
                            <FormInput
                                isRequired={false}
                                label="Position Name"
                                name="positionName"
                                placeholder="Enter Your Position Name"
                                description="Enter your job title or position (e.g., Software Engineer, Graphic Designer)."
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.positionName}
                                defaultValue={data.positionName}
                                type="text"
                                size="sm"
                                variant="flat"
                            />
                            {formik.errors.positionName && <NestErrors title={formik.errors.positionName} color="warning" />}
                        </FormMotion>
                        <div className="flex items-center justify-between w-full gap-1">
                            <FormMotion delay={0.5}>
                                <Select
                                    placeholder="Select your country"
                                    // description={
                                    //     data.country && data.country !== "Not provided"
                                    //         ? `You have selected: ${data.country}`
                                    //         : "Select your country of residence. This helps us provide localized content."
                                    // }
                                    onChange={(e) => { handleCountryChange(e.target.value), formik.handleChange }}
                                    label="Country"
                                    name="country"
                                    value={formik.values.country}
                                    onBlur={formik.handleBlur}
                                    className="w-full"
                                    radius="md"
                                    size="sm"
                                    defaultSelectedKeys={[data.country]}
                                    variant="flat"
                                    color="default"
                                    labelPlacement="inside"
                                >
                                    {allCountries
                                        .slice()
                                        .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
                                        .map((e: any) => (
                                            <SelectItem
                                                startContent={
                                                    <Avatar alt={e.name.common} className="w-6 h-6" src={e.flags.png} />
                                                }
                                                key={e.name.common}
                                                id={e.name.common}
                                            >
                                                {e.name.common}
                                            </SelectItem>
                                        ))}
                                </Select>
                                {formik.errors.country &&
                                    <NestErrors title={formik.errors.country} color='warning' />
                                }
                            </FormMotion>
                            <FormMotion delay={0.6}>
                                <Select
                                    placeholder="Select your gender"
                                    // description="Select your gender. This helps us to know your gender."
                                    label="Gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    className="w-full"
                                    radius="md"
                                    size="sm"
                                    variant="flat"
                                    defaultSelectedKeys={[data.gender || ""]}
                                    color="default"
                                    labelPlacement="inside"
                                >
                                    <SelectItem key="male" id="male">
                                        Male
                                    </SelectItem>
                                    <SelectItem key="female" id="female">
                                        Female
                                    </SelectItem>
                                </Select>
                                {formik.touched.gender && (
                                    <NestErrors title={formik.errors.gender} color='warning' />
                                )}

                            </FormMotion>
                        </div>

                        <FormMotion delay={0.7}>
                            <FormInput
                                isRequired={false}
                                variant="flat"
                                defaultValue={data.city}
                                size="sm"
                                description='Enter your city of residence. This helps us provide localized content.'
                                label='City'
                                type='text'
                                name='city'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.city as any}
                                placeholder='Enter your City'
                            />
                            {formik.errors.city &&
                                <NestErrors title={formik.errors.city} color='warning' />
                            }
                        </FormMotion>
                        <div className="flex items-center justify-between w-full gap-1">
                            <FormMotion delay={0.8}>
                                <FormInput
                                    isRequired={false}
                                    defaultValue={data.phone}
                                    size="sm"
                                    variant="flat"
                                    // description="Enter your phone number. This helps us to contact you."
                                    label='Phone Number'
                                    type='text'
                                    name='phone'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone || ""}
                                    placeholder="Enter Phone Number"
                                />
                                {formik.errors.phone &&
                                    <NestErrors title={formik.errors.phone} color='warning' />
                                }
                            </FormMotion>
                            <FormMotion delay={0.9}>
                                <DatePickerFieldNest
                                    name="birthday"
                                    label="Birth Date"
                                    defaultValue={data.birthday || ""}
                                    value={formik.values.birthday || ""} // Fallback to empty string if undefined
                                    onChange={(value) => formik.setFieldValue("birthday", value)}
                                    onBlur={() => formik.handleBlur("birthday")}
                                />
                                {formik.errors.birthday && (
                                    <NestErrors title={formik.errors.birthday} color="warning" />
                                )}
                            </FormMotion>
                        </div>
                        <FormMotion delay={1}>
                            <FormInput
                                isRequired={false}
                                defaultValue={data.about}
                                size="sm"
                                variant="flat"
                                description="Enter your website. This helps us to know more about you."
                                label='Website'
                                type='text'
                                name='website'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.website || ""}
                                placeholder="Enter Your Website"
                            />
                            {formik.errors.website && (
                                <NestErrors title={formik.errors.website} color="warning" />
                            )}
                        </FormMotion>
                        <FormMotion delay={1.1}>
                            <FormTextArea
                                description="Enter your about. This helps us to know more about you."
                                label='About'
                                name='about'
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.about || ""}
                                placeholder="Enter Your About"
                            />
                            {formik.errors.about && (
                                <NestErrors title={formik.errors.about} color="warning" />
                            )}
                        </FormMotion>

                    </form>
                </div>
            </DashBoardModal >
        </>
    );
};

export default UpdateUserInfo;