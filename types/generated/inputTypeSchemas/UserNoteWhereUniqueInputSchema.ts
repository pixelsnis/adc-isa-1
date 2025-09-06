import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteWhereInputSchema } from './UserNoteWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserNoteWhereUniqueInputSchema: z.ZodType<Prisma.UserNoteWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => UserNoteWhereInputSchema),z.lazy(() => UserNoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserNoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserNoteWhereInputSchema),z.lazy(() => UserNoteWhereInputSchema).array() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default UserNoteWhereUniqueInputSchema;
