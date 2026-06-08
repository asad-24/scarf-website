import nextEnv from "@next/env";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const sampleProducts = [
  ["Flame Orange", "Ignite every outfit with a bold orange scarf made for confident everyday styling.", 110, "/assests/scarf1.jpeg", true],
  ["Warm Taupe", "A quiet luxury neutral scarf with an earthy tone and polished finish.", 110, "/assests/scarf3.jpeg", true],
  ["Electric Citrus", "A high-energy citrus scarf with sharp color and premium Monkey Scarfs attitude.", 110, "/assests/scarf4.jpeg", true],
  ["Cool Lagoon", "A blue-green scarf with fresh styling energy and a crisp fashion edge.", 110, "/assests/scarf6.jpeg", false],
  ["Skyline Blue", "A calm blue scarf inspired by open skies, smooth layering, and everyday polish.", 110, "/assests/scarf7.jpeg", false],
  ["Raspberry Punch", "A rich statement scarf for gifting, styling, and bold color moments.", 110, "/assests/scarf8.jpeg", false],
  ["Teal Depth", "Deep teal color with a premium dark-box mood and clean everyday versatility.", 110, "/assests/scarf9.jpeg", false],
  ["Sunflower", "A bright yellow scarf with warm seasonal color and standout shelf appeal.", 110, "/assests/scarf10.jpeg", false],
  ["Lilac Haze", "A soft lilac scarf with gentle color, graceful styling, and modern charm.", 110, "/assests/scraf12.jpeg", false],
  ["Coral Reef", "Ocean heat and vibrant coral color built for expressive daily outfits.", 110, "/assests/13.jpeg", false],
  ["Mint Chill", "A fresh mint scarf with clean color and elevated neutral styling potential.", 110, "/assests/14.jpeg", false],
  ["Pure White", "A timeless white scarf with crisp presentation and effortless pairing power.", 110, "/assests/15.jpeg", false],
];

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["owner"], default: "owner" },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
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

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("MONGODB_URI, ADMIN_EMAIL, and ADMIN_PASSWORD are required for seeding.");
  }

  await mongoose.connect(MONGODB_URI);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  await Admin.findOneAndUpdate(
    { email: ADMIN_EMAIL.toLowerCase() },
    { email: ADMIN_EMAIL.toLowerCase(), passwordHash, role: "owner" },
    { upsert: true, returnDocument: "after" }
  );

  for (const [name, description, price, imageUrl, featured] of sampleProducts) {
    await Product.findOneAndUpdate(
      { slug: slugify(name) },
      {
        name,
        slug: slugify(name),
        description,
        price,
        imageUrl,
        category: "Drop 005",
        status: "active",
        featured,
      },
      { upsert: true, returnDocument: "after" }
    );
  }

  console.log(`Seeded admin ${ADMIN_EMAIL} and ${sampleProducts.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
