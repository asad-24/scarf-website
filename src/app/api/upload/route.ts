import type { NextRequest } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { uploadProductImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminFromRequest(request);
    if (!admin) {
      return jsonError("Unauthorized.", 401);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return jsonError("Image file is required.", 400);
    }

    if (!file.type.startsWith("image/")) {
      return jsonError("Only image uploads are allowed.", 400);
    }

    const upload = await uploadProductImage(file);
    return jsonOk(upload, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
