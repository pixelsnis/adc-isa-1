import { AccountContract } from "@waffles/contract";
import { getRequestContext } from "../lib/request-context";
import { s, prisma } from "@/init";

const AccountResolvers = s.router(AccountContract, {
  get: async (_) => {
    const { userId } = getRequestContext();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return {
        status: 404,
        body: undefined,
      };
    }

    return {
      status: 200,
      body: user,
    };
  },

  create: async (ctx) => {
    const { userId } = getRequestContext();
    const { email } = ctx.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        status: 409,
        body: "User already exists",
      };
    }

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
