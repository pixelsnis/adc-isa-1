import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutNotesInputSchema } from './UserUpdateWithoutNotesInputSchema';
import { UserUncheckedUpdateWithoutNotesInputSchema } from './UserUncheckedUpdateWithoutNotesInputSchema';
import { UserCreateWithoutNotesInputSchema } from './UserCreateWithoutNotesInputSchema';
import { UserUncheckedCreateWithoutNotesInputSchema } from './UserUncheckedCreateWithoutNotesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutNotesInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutNotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutNotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutNotesInputSchema;
