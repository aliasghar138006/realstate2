import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";
import User from "./User";

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    constructionDate: {
      type: Date,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    rules: {
      type: [String],
      default: [],
    },
    realState: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["villa", "store", "office", "apartment"],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
