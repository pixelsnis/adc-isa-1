import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteCreateNestedManyWithoutUserInputSchema } from './UserNoteCreateNestedManyWithoutUserInputSchema';

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  email: z.string(),
  notes: z.lazy(() => UserNoteCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateInputSchema;
