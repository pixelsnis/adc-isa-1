import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserNoteCreateManyInputSchema: z.ZodType<Prisma.UserNoteCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export default UserNoteCreateManyInputSchema;
