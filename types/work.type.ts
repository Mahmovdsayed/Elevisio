import { Image } from "./image.types";

type WorkExperience = {
  _id: string;
  companyName: string;
  positionName: string;
  description: string | null;
  from: string;
  to: string | null;
  companyImage: Image;
  userID: string;
  current: boolean;
  employmentType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { WorkExperience };
