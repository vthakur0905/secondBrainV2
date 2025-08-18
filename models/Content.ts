import { contentInput } from "@/schema/Content";
import mongoose, { model, models, Schema } from "mongoose";

export interface contentInterface extends contentInput {
  userId: String;
}

export const contentSchema = new Schema<contentInterface>({
  link: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    
  },
  description: {
    type: String,
  },
  vector: {
    type: [Number],
    default: [],
    
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  userId: {
    type: String,
    ref: "User",
    
  },
},
{
    timestamps : true
});


export const contentModel = models.Content || model<contentInterface>("Content", contentSchema)