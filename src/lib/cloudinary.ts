import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadProductImage(file: File) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("Cloudinary is not configured.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "monkey-scarfs/products",
    resource_type: "image",
    transformation: [{ width: 1400, height: 1750, crop: "limit", quality: "auto", fetch_format: "auto" }],
  });

  return {
    imageUrl: result.secure_url,
    imagePublicId: result.public_id,
  };
}

export async function deleteProductImage(publicId?: string) {
  if (!publicId || !process.env.CLOUDINARY_CLOUD_NAME) {
    return;
  }
  await cloudinary.uploader.destroy(publicId);
}
