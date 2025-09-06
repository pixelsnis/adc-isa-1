import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const UserNoteScalarWhereInputSchema: z.ZodType<Prisma.UserNoteScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserNoteScalarWhereInputSchema),z.lazy(() => UserNoteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserNoteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserNoteScalarWhereInputSchema),z.lazy(() => UserNoteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default UserNoteScalarWhereInputSchema;
