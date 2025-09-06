import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteWhereInputSchema } from './UserNoteWhereInputSchema';

export const UserNoteListRelationFilterSchema: z.ZodType<Prisma.UserNoteListRelationFilter> = z.object({
  every: z.lazy(() => UserNoteWhereInputSchema).optional(),
  some: z.lazy(() => UserNoteWhereInputSchema).optional(),
  none: z.lazy(() => UserNoteWhereInputSchema).optional()
}).strict();

export default UserNoteListRelationFilterSchema;
