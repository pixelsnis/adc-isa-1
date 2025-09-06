import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteSelectSchema } from '../inputTypeSchemas/UserNoteSelectSchema';
import { UserNoteIncludeSchema } from '../inputTypeSchemas/UserNoteIncludeSchema';

export const UserNoteArgsSchema: z.ZodType<Prisma.UserNoteDefaultArgs> = z.object({
  select: z.lazy(() => UserNoteSelectSchema).optional(),
  include: z.lazy(() => UserNoteIncludeSchema).optional(),
}).strict();

export default UserNoteArgsSchema;
