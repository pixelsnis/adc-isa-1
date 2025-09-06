import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutNotesInputSchema } from './UserCreateWithoutNotesInputSchema';
import { UserUncheckedCreateWithoutNotesInputSchema } from './UserUncheckedCreateWithoutNotesInputSchema';

export const UserCreateOrConnectWithoutNotesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutNotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutNotesInputSchema;
