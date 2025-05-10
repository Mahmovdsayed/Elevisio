export type SocialLink = {
  _id: string;
  platform: string;
  url: string;
};

export type Contact = {
  _id: string;
  userID: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  socialLinks: SocialLink[];
};
