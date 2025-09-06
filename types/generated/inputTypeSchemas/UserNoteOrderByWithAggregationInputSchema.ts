import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserNoteCountOrderByAggregateInputSchema } from './UserNoteCountOrderByAggregateInputSchema';
import { UserNoteMaxOrderByAggregateInputSchema } from './UserNoteMaxOrderByAggregateInputSchema';
import { UserNoteMinOrderByAggregateInputSchema } from './UserNoteMinOrderByAggregateInputSchema';

export const UserNoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserNoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserNoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserNoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserNoteMinOrderByAggregateInputSchema).optional()
}).strict();

export default UserNoteOrderByWithAggregationInputSchema;
