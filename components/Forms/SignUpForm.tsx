'use client'
import { signUpValidationSchema } from '@/Validation/SignUpValidation';
import { signUpUser } from '@/app/actions/auth/signup.action';
import useFormHandler from '@/hooks/useFormHandler';
import { SignUpInitialState } from '@/services/InitialState';
import NestErrors from '../Ui/NestErrors';
import FormMotion from '../motion/FormMotion';
import FormInput from '../Ui/FormInput';
import FormInputPassword from '../Ui/FormInputPassword';
import { IoLogIn } from 'react-icons/io5';
import SubmitButton from '../Ui/SubmitButton';
import useHandleResponse from '@/hooks/useHandleResponse';
import { Link } from '@heroui/react';

const SignUpForm = () => {
    const handleResponse = useHandleResponse();

    const formik = useFormHandler(SignUpInitialState, signUpValidationSchema, async (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as string);
            }
        });

        await handleResponse(signUpUser(formData), formik.resetForm, `/verify?email=${values.email}`)
    });

    return (
        <div className="pt-5 lg:w-9/12 lg:mx-auto">
            <form
                className="flex flex-col gap-2"
                onSubmit={formik.handleSubmit}
            >
                <div className='flex items-center justify-center gap-2'>
                    {/* First Name */}
                    <FormMotion delay={0.4}>
                        <FormInput
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            type="text"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Your First Name"
                            description="Enter your first name as it appears on your official website."
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <NestErrors title={formik.errors.firstName} color='warning' />
                        )}
                    </FormMotion>
                    {/* Last Name */}
                    <FormMotion delay={0.5}>
                        <FormInput
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            type="text"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Enter Your Last Name"
                            description='Enter your last name as it appears on your official website.'
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <NestErrors title={formik.errors.lastName} color='warning' />
                        )}
                    </FormMotion>
                </div>
                {/* userName */}
                <FormMotion delay={0.6}>
                    <FormInput
                        name="userName"
                        label="User Name"
                        value={formik.values.userName}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Choose a unique username that represents you. This will be your public identity."
                        placeholder="Enter Your Username"
                    />
                    {formik.touched.userName && formik.errors.userName && (
                        <NestErrors title={formik.errors.userName} color='warning' />
                    )}
                </FormMotion>
                {/* Email */}
                <FormMotion delay={0.7}>
                    <FormInput
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        description="Enter a valid email address. This will be used for account verification and communication."
                        placeholder="Enter Your Email"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <NestErrors title={formik.errors.email} color='warning' />
                    )}
                </FormMotion>
                {/* Password */}
                <FormMotion delay={0.8}>
                    <FormInputPassword
                        name='password'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        description="Create a strong password with at least 6 characters, including uppercase, lowercase, and numbers."
                        placeholder='Enter Your Password'
                    />
                    {formik.touched.password && formik.errors.password && (
                        <NestErrors title={formik.errors.password} color='warning' />
                    )}
                </FormMotion>
                {/* Submit Button */}
                <FormMotion delay={0.9}>
                    <SubmitButton
                        title='Sign Up'
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        startContent={<IoLogIn />}
                    />
                </FormMotion>
            </form>
            <FormMotion delay={1}>
                <div className='flex items-start justify-start my-3'>
                    <span className='text-start text-sm'>Have an account already ? <Link href='/login' size='sm' showAnchorIcon>Login Now</Link></span>
                </div>
            </FormMotion>
        </div>
    );
};

export default SignUpForm;
