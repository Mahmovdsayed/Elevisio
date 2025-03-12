// {/* Country */}
// <FormMotion delay={0.8}>
// <Select
//     placeholder="Select your country"
//     description="Select your country of residence. This helps us provide localized content."
//     label="Country"
//     name="country"
//     value={formik.values.country}
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     className="w-full"
//     radius="md"
//     size="md"
//     variant="flat"
//     color="default"
//     labelPlacement="inside"
//     isRequired
// >
//     {allCountries
//         .slice()
//         .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
//         .map((e: any) => (
//             <SelectItem
//                 startContent={
//                     <Avatar alt={e.name.common} className="w-6 h-6" src={e.flags.png} />
//                 }
//                 key={e.name.common}
//                 id={e.name.common}
//             >
//                 {e.name.common}
//             </SelectItem>
//         ))}
// </Select>
// {formik.touched.country && formik.errors.country && (
//     <NestErrors title={formik.errors.country} color='warning' />
// )}
// </FormMotion>
// {/* City */}
// <FormMotion delay={0.9}>
// <FormInput
//     description='Enter your city of residence. This helps us provide localized content.'
//     label='City'
//     type='text'
//     name='city'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.city as any}
//     placeholder='Enter your City'
// />
// {formik.touched.city && formik.errors.city && (
//     <NestErrors title={formik.errors.city} color='warning' />
// )}
// </FormMotion>
// {/* Position Name */}
// <FormMotion delay={0.9}>
// <FormInput
//     description="Enter your job title or position (e.g., Software Engineer, Graphic Designer)."
//     label='Position Name'
//     type='text'
//     name='positionName'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.positionName || ""}
//     placeholder="Enter Position Name"
// />
// {formik.touched.positionName && formik.errors.positionName && (
//     <NestErrors title={formik.errors.positionName} color='warning' />
// )}
// </FormMotion>
// {/* Phone Number  */}
// <FormMotion delay={1}>
// <FormInput
//     description="Enter your phone number. This helps us to contact you."
//     label='Phone Number'
//     type='text'
//     name='phone'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.phone || ""}
//     placeholder="Enter Phone Number"
// />
// {formik.touched.phone && formik.errors.phone && (
//     <NestErrors title={formik.errors.phone} color='warning' />
// )}

// </FormMotion>
// {/* Birthday */}
// <FormMotion delay={1.1}>
// <FormInput
//     description="Enter your birthday. This helps us to know your age."
//     label='Birthday'
//     type='date'
//     name='birthday'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.birthday as any}
//     placeholder="Enter Your Birthday"
// />
// {formik.touched.birthday && formik.errors.birthday && (
//     <NestErrors title={formik.errors.birthday as any} color='warning' />
// )}

// </FormMotion>
// {/* Gender */}
// <FormMotion delay={1.2}>
// <Select
//     placeholder="Select your gender"
//     description="Select your gender. This helps us to know your gender."
//     label="Gender"
//     name="gender"
//     value={formik.values.gender}
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     className="w-full"
//     radius="md"
//     size="md"
//     variant="flat"
//     color="default"
//     labelPlacement="inside"
//     isRequired
// >
//     <SelectItem key="Male" id="Male">
//         Male
//     </SelectItem>
//     <SelectItem key="Female" id="Female">
//         Female
//     </SelectItem>
// </Select>
// {formik.touched.gender && formik.errors.gender && (
//     <NestErrors title={formik.errors.gender} color='warning' />
// )}

// </FormMotion>
// {/* bio */}
// <FormMotion delay={1.3}>
// <FormTextArea
//     description="Enter your bio. This helps us to know more about you."
//     label='Bio'
//     name='bio'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.bio || ""}
//     placeholder="Enter Your Bio"
// />
// {formik.touched.bio && formik.errors.bio && (
//     <NestErrors title={formik.errors.bio} color='warning' />
// )}
// </FormMotion>
// {/* about */}
// <FormMotion delay={1.4}>
// <FormTextArea
//     description="Enter your about. This helps us to know more about you."
//     label='About'
//     name='about'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.about || ""}
//     placeholder="Enter Your About"
// />
// {formik.touched.about && formik.errors.about && (
//     <NestErrors title={formik.errors.about} color='warning' />
// )}
// </FormMotion>
// {/* website */}
// <FormMotion delay={1.5}>
// <FormInput
//     description="Enter your website. This helps us to know more about you."
//     label='Website'
//     type='text'
//     name='website'
//     onBlur={formik.handleBlur}
//     onChange={formik.handleChange}
//     value={formik.values.website || ""}
//     placeholder="Enter Your Website"
// />
// {formik.touched.website && formik.errors.website && (
//     <NestErrors title={formik.errors.website} color='warning' />
// )}
// </FormMotion>