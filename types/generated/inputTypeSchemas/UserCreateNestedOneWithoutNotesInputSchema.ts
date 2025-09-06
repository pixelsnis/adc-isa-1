import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotesInputSchema } from './UserCreateWithoutNotesInputSchema';
import { UserUncheckedCreateWithoutNotesInputSchema } from './UserUncheckedCreateWithoutNotesInputSchema';
import { UserCreateOrConnectWithoutNotesInputSchema } from './UserCreateOrConnectWithoutNotesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutNotesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutNotesInputSchema;
