import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserCreateWithoutNotesInputSchema: z.ZodType<Prisma.UserCreateWithoutNotesInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string()
}).strict();

export default UserCreateWithoutNotesInputSchema;
