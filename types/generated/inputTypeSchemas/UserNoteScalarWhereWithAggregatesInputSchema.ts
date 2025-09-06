import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const UserNoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserNoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserNoteScalarWhereWithAggregatesInputSchema),z.lazy(() => UserNoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserNoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserNoteScalarWhereWithAggregatesInputSchema),z.lazy(() => UserNoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default UserNoteScalarWhereWithAggregatesInputSchema;
