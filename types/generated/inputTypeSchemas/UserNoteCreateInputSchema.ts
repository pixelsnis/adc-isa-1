import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutNotesInputSchema } from './UserCreateNestedOneWithoutNotesInputSchema';

export const UserNoteCreateInputSchema: z.ZodType<Prisma.UserNoteCreateInput> = z.object({
  id: z.string().uuid().optional(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutNotesInputSchema)
}).strict();

export default UserNoteCreateInputSchema;
