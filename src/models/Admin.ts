import mongoose, { Schema, type Model } from "mongoose";

export type AdminRole = "owner";

export type AdminDocument = {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
};

const AdminSchema = new Schema<AdminDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["owner"],
      default: "owner",
    },
  },
  { timestamps: true }
);

const Admin =
  (mongoose.models.Admin as Model<AdminDocument> | undefined) ??
  mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;
