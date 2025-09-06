import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteUncheckedCreateNestedManyWithoutUserInputSchema } from './UserNoteUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  joinedAt: z.coerce.date().optional(),
  notes: z.lazy(() => UserNoteUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateInputSchema;
