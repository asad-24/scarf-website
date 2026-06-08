import mongoose, { Schema, type Model } from "mongoose";

export type ProductStatus = "active" | "draft";

export type ProductDocument = {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imagePublicId?: string;
  category: string;
  status: ProductStatus;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    category: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ProductSchema.index({ name: "text", description: "text", category: "text" });

const Product =
  (mongoose.models.Product as Model<ProductDocument> | undefined) ??
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
