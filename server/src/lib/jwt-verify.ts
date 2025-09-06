import type { Request } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";

// Base URL for the Supabase project used for authentication.
const SUPABASE_URL = "https://xpjuesvglvuiszokgpsl.supabase.co";
const SUPABASE_JWKS_URL = `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`;

/**
 * Verify a Supabase JWT using the project's JWKS endpoint.
 * @param token - raw bearer token string
 * @returns the verified JWT payload
 * @throws when verification fails
 */
async function verifySupabaseToken(token: string) {
  const JWKS = createRemoteJWKSet(new URL(SUPABASE_JWKS_URL));

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${SUPABASE_URL}/auth/v1`,
      audience: "authenticated",
    });
    return payload;
  } catch (error) {
    // Log the underlying error for debugging but throw a generic error to callers
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
