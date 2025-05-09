/**
 * The type `Education` represents information about a user's education history, including details such
 * as school name, dates attended, GPA, and related images.
 * @property {string} _id - The `_id` property is a unique identifier for the education record. It is a
 * string type.
 * @property {string} schoolName - The name of the school where the education was obtained.
 * @property {string} faculty - The `faculty` property in the `Education` type represents the specific
 * department or division within a school or university where the individual studied. It typically
 * refers to the academic discipline or area of study that the individual pursued during their
 * education.
 * @property {string} from - The `from` property in the `Education` type represents the starting date
 * or year of the education period. It indicates when the individual started studying at the particular
 * educational institution.
 * @property {string | null} to - The `to` property in the `Education` type represents the end date of
 * the education period. It is a string type that can either hold a date value or `null` if the
 * education is ongoing.
 * @property {EducationStatus} status - The `status` property in the `Education` type is an enum type
 * called `EducationStatus`. It represents the education status of an individual, which can be either
 * "Currently Studying" or "Graduated".
 * @property {string | null} description - The `description` property in the `Education` type is a
 * string that can hold additional information or details about the education experience. It can be
 * `null` if no description is provided.
 * @property {number | null} gpa - The `gpa` property in the `Education` type represents the Grade
 * Point Average of the individual's academic performance. It is a numerical value that indicates the
 * average of the grades achieved by the individual in their education. The `gpa` property is optional
 * and can be `null` if the
 * @property {string} location - The `location` property in the `Education` type represents the
 * physical location of the educational institution where the individual studied or is currently
 * studying. It typically includes the city or region where the school is located.
 * @property {Image} schoolImage - The `schoolImage` property in the `Education` type is of type
 * `Image`. It is used to store an image related to the school or educational institution where the
 * individual studied.
 * @property {string} certificateURL - The `certificateURL` property in the `Education` type is a
 * string that represents the URL where the certificate related to the education can be accessed or
 * viewed.
 * @property {string} userID - The `userID` property in the `Education` type represents the unique
 * identifier of the user associated with the education record. It is a string type field used to link
 * the education information to a specific user in the system.
 * @property {string} createdAt - The `createdAt` property in the `Education` type represents the
 * timestamp when the education record was created. It is a string type in ISO 8601 format, indicating
 * the date and time of creation.
 * @property {string} updatedAt - The `updatedAt` property in the `Education` type represents the date
 * and time when the education record was last updated. It is a string that stores the timestamp of the
 * last update to the education information.
 * @property {number} __v - The `__v` property in the `Education` type is a version key typically used
 * in Mongoose schemas to track the document version. It is an internal property managed by
 * MongoDB/Mongoose and is used for handling document versions and conflicts during updates.
 */
import { Image } from "./image.types";

enum EducationStatus {
  CURRENTLY_STUDYING = "Currently Studying",
  GRADUATED = "Graduated",
}

type Education = {
  _id: string;
  schoolName: string;
  faculty: string;
  from: string;
  to: string | null;
  status: EducationStatus;
  description: string | null;
  gpa: number | null;
  location: string;
  schoolImage: Image;
  certificateURL: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { Education };
