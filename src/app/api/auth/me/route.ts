import type { NextRequest } from "next/server";
import { getAdminFromRequest } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return jsonError("Unauthorized.", 401);
  }
  return jsonOk({ admin });
}
