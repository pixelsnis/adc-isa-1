import type { Request } from "express";
import { jwtVerify } from "jose";

// Base URL for the Supabase project used for authentication.
const SUPABASE_URL = "https://ruipsahegjajpshqviry.supabase.co";

/**
 * Verify a Supabase JWT using the shared JWT secret (HS256) configured in
 * SUPABASE_JWT_SECRET. This is a simpler approach than using JWKS and works
 * when the project is configured to sign access tokens with a shared secret.
 */
async function verifySupabaseToken(token: string) {
  const secret = process.env.SUPABASE_JWT_SECRET;
  if (!secret) {
    console.error("SUPABASE_JWT_SECRET is not configured in the environment");
    throw new Error("Missing SUPABASE_JWT_SECRET");
  }

  const key = new TextEncoder().encode(secret);

  try {
    const { payload } = await jwtVerify(token, key, {
      issuer: `${SUPABASE_URL}/auth/v1`,
      audience: "authenticated",
    });
    return payload;
  } catch (error) {
    console.error("Supabase token verification failed:", error);
    throw new Error("Invalid Supabase token");
  }
}

/**
 * Validate the Authorization header on an incoming Express request.
 * - expects a `Bearer <token>` header
 * - returns the token payload on success or `null` on failure
 *
 * The returned payload typically contains the `sub` field with the user id.
 */
export async function validateAuth(request: Request) {
  const authHeader = request.headers.authorization;

  // If header missing or not a Bearer token, return null to indicate unauthenticated
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  // Remove the leading `Bearer ` prefix to get the token
  const token = authHeader.substring(7);

  try {
    const payload = await verifySupabaseToken(token);
    return payload;
  } catch (error) {
    // Returning null keeps the calling middleware simple: it treats null as unauthenticated
    console.error("Auth validation failed", error);
    return null;
  }
}
