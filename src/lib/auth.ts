// src/lib/auth.ts
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function getUserFromCookies() {
  const token = (await cookies()).get("sessionCookie")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ID!) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}
