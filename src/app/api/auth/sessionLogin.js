// /api/auth/sessionLogin (API route in Next.js)
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function POST(request) {
  const { idToken } = await request.json();
  const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });

  cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

  return NextResponse.json({ status: "success" });
}
