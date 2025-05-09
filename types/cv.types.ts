export interface CV {
  _id: string;
  name: string;
  isMainCV: boolean;
  userID: string;
  CV: {
    url: string;
    public_id: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
  __v?: number;
}
