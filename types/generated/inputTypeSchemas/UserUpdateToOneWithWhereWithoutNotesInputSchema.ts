import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutNotesInputSchema } from './UserUpdateWithoutNotesInputSchema';
import { UserUncheckedUpdateWithoutNotesInputSchema } from './UserUncheckedUpdateWithoutNotesInputSchema';

export const UserUpdateToOneWithWhereWithoutNotesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutNotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutNotesInputSchema;
