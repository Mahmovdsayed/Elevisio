const baseUrl = "http://localhost:3000";

const employmentType = [
  { key: "Full-time", label: "Full-time" },
  { key: "Part-time", label: "Part-time" },
  { key: "Contract", label: "Contract" },
  { key: "Internship", label: "Internship" },
  { key: "Freelance", label: "Freelance" },
  { key: "Remote", label: "Remote" },
  { key: "Temporary", label: "Temporary" },
  { key: "Casual", label: "Casual" },
  { key: "Volunteer", label: "Volunteer" },
  { key: "Self-Employed", label: "Self-Employed" },
  { key: "Apprenticeship", label: "Apprenticeship" },
  { key: "Other", label: "Other" },
];

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

const minAge = 13;
const maxAge = 100;

export { baseUrl, employmentType, allowedImageTypes, minAge, maxAge };
