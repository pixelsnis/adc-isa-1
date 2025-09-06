import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserNoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserNoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default UserNoteMinOrderByAggregateInputSchema;
