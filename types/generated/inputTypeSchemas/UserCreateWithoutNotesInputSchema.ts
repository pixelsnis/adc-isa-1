import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserCreateWithoutNotesInputSchema: z.ZodType<Prisma.UserCreateWithoutNotesInput> = z.object({
  id: z.string(),
  email: z.string(),
  joinedAt: z.coerce.date().optional()
}).strict();

export default UserCreateWithoutNotesInputSchema;
