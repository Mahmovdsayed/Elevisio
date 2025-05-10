import { Image } from "./image.types";

interface Project {
  _id: string;
  name: string;
  description: string;
  projectImage: Image;
  userID: string;
  clientName: string;
  from: string;
  to: string;
  projectType: string;
  techStack: string[];
  designTools: string[];
  projectURL: string;
  githubURL: string;
  designFileURL: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { Project };
