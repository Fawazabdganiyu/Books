import { Document, Types } from "mongoose";

export interface IBook extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  publishedDate: string;
  ISBN: number;
  storageUrl?: string;
}
