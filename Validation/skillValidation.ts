import * as yup from "yup";

const skillValidationSchema = yup.object({
  name: yup
    .array()
    .of(yup.string().required("Skill Name is required"))
    .min(1, "At least one skill name is required"),
  category: yup.string().required("Category is required"),
});

const updateSkillValidationSchema = yup.object({
  name: yup.string().required("Skill Name is required"),
  category: yup.string().required("Category is required"),
});

export { skillValidationSchema, updateSkillValidationSchema };
