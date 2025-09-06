import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export default UserCreateManyInputSchema;
