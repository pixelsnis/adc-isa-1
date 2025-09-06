import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserNoteUncheckedCreateInputSchema: z.ZodType<Prisma.UserNoteUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export default UserNoteUncheckedCreateInputSchema;
