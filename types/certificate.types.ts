import { Image } from "./image.types";

interface Certificate {
  _id: string;
  title: string;
  userID: string;
  certificateImage: Image;
  certificateURL: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { Certificate };
