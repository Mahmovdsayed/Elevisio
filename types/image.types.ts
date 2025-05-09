/**
 * The type `Image` in TypeScript represents an object with specific properties related to an image.
 * @property {string} url - A string representing the URL of the image.
 * @property {string} public_id - The `public_id` property in the `Image` type represents the unique
 * identifier associated with the image in a cloud storage service or image hosting platform. It is
 * commonly used to reference and retrieve the image from the storage.
 * @property {string} _id - The `_id` property is typically used as a unique identifier for the image
 * object. It helps in distinguishing one image from another within a collection or database.
 * @property {string} createdAt - The `createdAt` property in the `Image` type represents the date and
 * time when the image was created or added to the system. It is a string that typically stores the
 * timestamp in a specific format, such as ISO 8601.
 * @property {string} updatedAt - The `updatedAt` property in the `Image` type represents the date and
 * time when the image was last updated.
 */
type Image = {
  url: string;
  public_id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type { Image };
