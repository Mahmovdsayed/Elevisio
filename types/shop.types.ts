import { Image } from "./image.types";

interface ShopItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number | null;
  hasDiscount: boolean;
  purchaseLink: string;
  category: string;
  productImage: Image;
  userID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  textColor: string;
  dominantColor: string;
  status: string;
}

export type { ShopItem };
