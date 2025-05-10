import { Image } from "./image.types";

type SocialMedia = {
  facebook: string;
  instagram: string;
};

type Organizer = {
  name: string;
  email: string;
  phone: string;
  website: string;
  socialMedia: SocialMedia;
  bio: string;
  image: Image;
};

type Speaker = {
  name: string;
  bio: string;
  socialMedia: SocialMedia;
  _id: string;
};

type Sponsor = {
  name: string;
  tier: "silver" | "gold" | "platinum";
  website: string;
  _id: string;
};

type FAQ = {
  question: string;
  answer: string;
  _id: string;
};

type TicketType = {
  name: string;
  price: number;
  _id: string;
};

type Location = {
  venue: string;
  address: string;
  city: string;
  country: string;
  onlineEvent: boolean;
  meetingLink: string;
};

type DateTime = {
  start: string;
  end: string;
};

type Registration = {
  externalLink: string;
  status: "open" | "closed";
  closeDate: string;
};

type EventData = {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  eventBanner: Image;
  userID: string;
  status: "draft" | "published";
  category: string;
  dateTime: DateTime;
  location: Location;
  registration: Registration;
  ticketTypes: TicketType[];
  isFree: boolean;
  currency: string;
  views: number;
  organizer: Organizer;
  speakers: Speaker[];
  sponsors: Sponsor[];
  faqs: FAQ[];
  termsConditions: string;
  refundPolicy: string;
  ageRestriction: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type {
  SocialMedia,
  Organizer,
  Speaker,
  Sponsor,
  FAQ,
  TicketType,
  Location,
  DateTime,
  Registration,
  EventData,
};
