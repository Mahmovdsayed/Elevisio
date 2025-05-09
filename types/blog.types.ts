import { Image } from "./image.types";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  userID: string;
  category: string;
  views: number;
  seoKeywords: string[];
  blogImage: Image;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type { BlogPost };
