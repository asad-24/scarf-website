import { NextResponse, type NextRequest } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";
import { handleApiError, jsonError } from "@/lib/api";
import { loginSchema } from "@/lib/validators";
import { setAdminCookie, signAdminToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const credentials = loginSchema.parse(body);

    await connectDB();
    const admin = await Admin.findOne({ email: credentials.email });
    if (!admin) {
      return jsonError("Invalid admin credentials.", 401);
    }

    const validPassword = await verifyPassword(credentials.password, admin.passwordHash);
    if (!validPassword) {
      return jsonError("Invalid admin credentials.", 401);
    }

    const token = signAdminToken({ adminId: String(admin._id), email: admin.email });
    const response = NextResponse.json({
      admin: { id: String(admin._id), email: admin.email, role: admin.role },
    });
    setAdminCookie(response, token);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
