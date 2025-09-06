import { AccountContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import { s, prisma } from "@/init";

/**
 * Resolvers for account-related endpoints.
 * Uses the typed router `s.router` so each handler receives a typed ctx.
 */
const AccountResolvers = s.router(AccountContract, {
  /**
   * GET /account - return the currently authenticated user
   * @returns 200 with the user object or 404 when not found
   */
  get: async (_) => {
    // Read user id from the per-request async context
    const { userId } = getRequestContext();

    // Lookup the user in the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If user doesn't exist, surface a 404 response
    if (!user) {
      return {
        status: 404,
        body: undefined,
      };
    }

    // Otherwise return the user
    return {
      status: 200,
      body: user,
    };
  },

  /**
   * POST /account - create a user record for the authenticated user id
   * - Ensures there isn't already a user with the provided email.
   * @param ctx.body.email - the email address to create
   * @returns 201 with created user, or 409 if email already exists
   */
  create: async (ctx) => {
    const { userId } = getRequestContext();
    const { email } = ctx.body;

    // Check if a user with the email already exists to avoid duplicates
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        status: 409,
        body: "User already exists",
      };
    }

    // Create a new user using the authenticated id as the record id
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });

    return {
      status: 201,
      body: newUser,
    };
  },
});

export default AccountResolvers;
