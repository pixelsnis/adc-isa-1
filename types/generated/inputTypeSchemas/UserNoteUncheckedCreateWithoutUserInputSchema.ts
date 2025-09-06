import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';

export const UserNoteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserNoteUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export default UserNoteUncheckedCreateWithoutUserInputSchema;
