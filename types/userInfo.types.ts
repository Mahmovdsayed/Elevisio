/**
 * The type `User` defines the structure of a user object with various properties such as name, email,
 * image, nationality, and more.
 * @property {string} _id - The `_id` property in the `User` type represents the unique identifier for
 * a user.
 * @property {string} userName - The `userName` property in the `User` type represents the username of
 * a user.
 * @property {string} firstName - The `firstName` property in the `User` type represents the first name
 * of a user.
 * @property {string} lastName - The `lastName` property in the `User` type represents the last name of
 * a user.
 * @property {string} email - The `email` property in the `User` type represents the email address of a
 * user.
 * @property {string | null} birthday - The `birthday` property in the `User` type represents the
 * user's date of birth. It can be a string value or `null` if the user has not provided their birthday
 * information.
 * @property {Image} image - The `image` property in the `User` type is of type `Image`, which is
 * imported from "./image.types". This suggests that the `image` property will contain information
 * related to an image, such as its URL, dimensions, or other image-related data.
 * @property {string} about - The `about` property in the `User` type represents a string that
 * typically contains a brief description or information about the user. It can be used to provide
 * additional details about the user's background, interests, or any other relevant information.
 * @property {boolean} isVerified - The `isVerified` property in the `User` type indicates whether the
 * user account has been verified or not. It is a boolean value where `true` typically means the
 * account is verified and `false` means it is not verified.
 * @property {string} nationality - The `nationality` property in the `User` type represents the
 * nationality of the user, which typically refers to the country of citizenship or origin of the user.
 * @property {string} country - The `country` property in the `User` type represents the country where
 * the user is located. It is a string type property.
 * @property {string} city - The `city` property in the `User` type represents the city where the user
 * is located.
 * @property {string} positionName - The `positionName` property in the `User` type represents the
 * position or job title of the user. It is a string type indicating the role or position held by the
 * user.
 * @property {string | null} gender - The `gender` property in the `User` type is a string or null,
 * indicating the gender of the user. It can hold values such as "male", "female", "non-binary", or any
 * other gender identity the user specifies. If the user has not specified their gender, the value
 * @property {string} phone - The `phone` property in the `User` type represents the phone number of
 * the user. It is a string type in this case.
 * @property {string} website - The `website` property in the `User` type represents the website
 * associated with the user's profile. It is a string type that holds the URL of the user's website.
 * @property {string} createdAt - The `createdAt` property in the `User` type represents the date and
 * time when the user was created.
 * @property {string} updatedAt - The `updatedAt` property in the `User` type represents the date and
 * time when the user's information was last updated.
 */
import { Image } from "./image.types";

type User = {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string | null;
  image: Image;
  about: string;
  isVerified: boolean;
  nationality: string;
  country: string;
  city: string;
  positionName: string;
  gender: string | null;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
};

export type { User };
