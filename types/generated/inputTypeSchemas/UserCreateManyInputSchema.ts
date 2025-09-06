import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string()
}).strict();

export default UserCreateManyInputSchema;
