/**
 * The type `UserInfoFormValues` in TypeScript defines optional fields for user information in a form.
 * @property {string} firstName - A string representing the user's first name.
 * @property {string} lastName - The `lastName` property in the `UserInfoFormValues` type represents
 * the last name of a user. It is optional, meaning it may or may not be provided when creating an
 * instance of `UserInfoFormValues`.
 * @property {string} positionName - The `positionName` property in the `UserInfoFormValues` type
 * represents the position or job title of the user. It could be used to store information such as
 * "Software Engineer", "Marketing Manager", "Sales Associate", etc.
 * @property {string} birthday - The `birthday` property in the `UserInfoFormValues` type represents
 * the user's date of birth and is expected to be a string value.
 * @property {string} phone - The `phone` property in the `UserInfoFormValues` type represents the
 * user's phone number. It is a string type, which means it should store the phone number as a sequence
 * of characters.
 * @property {string} website - The `website` property in the `UserInfoFormValues` type represents the
 * website URL of the user. It can be used to store the user's personal or professional website link.
 * @property {string} gender - The `gender` property in the `UserInfoFormValues` type represents the
 * gender of the user. It is a string type field where the user can input their gender information,
 * such as "Male", "Female", "Non-binary", etc.
 * @property {string} about - The `about` property in the `UserInfoFormValues` type represents a string
 * that contains information about the user, such as a brief description or bio. It can be used to
 * provide additional details or context about the user filling out the form.
 * @property {string} country - The `country` property in the `UserInfoFormValues` type represents the
 * country where the user is located or resides.
 * @property {string} nationality - The `nationality` property in the `UserInfoFormValues` type
 * represents the nationality of a user, which typically refers to the country of citizenship or origin
 * of an individual.
 * @property {string} city - The `city` property in the `UserInfoFormValues` type represents the city
 * where the user is located. It is a string type that can hold the name of the city.
 */

type UserInfoFormValues = {
  firstName?: string;
  lastName?: string;
  positionName?: string;
  birthday?: string;
  phone?: string;
  website?: string;
  gender?: string;
  about?: string;
  country?: string;
  nationality?: string;
  city?: string;
};

export type { UserInfoFormValues };
