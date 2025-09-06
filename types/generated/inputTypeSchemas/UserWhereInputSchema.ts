import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { UserNoteListRelationFilterSchema } from './UserNoteListRelationFilterSchema';

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.lazy(() => UserNoteListRelationFilterSchema).optional()
}).strict();

export default UserWhereInputSchema;
