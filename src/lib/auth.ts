import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import Admin from "@/models/Admin";
import { connectDB } from "@/lib/db";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";
export { ADMIN_COOKIE_NAME };

type AdminToken = {
  adminId: string;
  email: string;
};

export type AdminSession = AdminToken & {
  role: "owner";
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }
  return secret;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminToken) {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
}

export function verifyAdminToken(token?: string): AdminToken | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as AdminToken;
    if (!decoded.adminId || !decoded.email) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export function setAdminCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminFromRequest(request: NextRequest): Promise<AdminSession | null> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const payload = verifyAdminToken(token);
  if (!payload) {
    return null;
  }

  await connectDB();
  const admin = await Admin.findById(payload.adminId).lean();
  if (!admin || admin.email !== payload.email) {
    return null;
  }

  return { adminId: String(admin._id), email: admin.email, role: "owner" };
}

export async function getAdminFromCookies(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const payload = verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  if (!payload) {
    return null;
  }

  await connectDB();
  const admin = await Admin.findById(payload.adminId).lean();
  if (!admin || admin.email !== payload.email) {
    return null;
  }

  return { adminId: String(admin._id), email: admin.email, role: "owner" };
}
