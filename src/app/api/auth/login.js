// api/auth/login.js (server component)
import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";
export async function POST(request) {
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
  cookies().set("session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });
  // Respond as needed
}
