import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserCreateWithoutNotesInputSchema } from './UserCreateWithoutNotesInputSchema';
import { UserUncheckedCreateWithoutNotesInputSchema } from './UserUncheckedCreateWithoutNotesInputSchema';
import { UserCreateOrConnectWithoutNotesInputSchema } from './UserCreateOrConnectWithoutNotesInputSchema';
import { UserUpsertWithoutNotesInputSchema } from './UserUpsertWithoutNotesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutNotesInputSchema } from './UserUpdateToOneWithWhereWithoutNotesInputSchema';
import { UserUpdateWithoutNotesInputSchema } from './UserUpdateWithoutNotesInputSchema';
import { UserUncheckedUpdateWithoutNotesInputSchema } from './UserUncheckedUpdateWithoutNotesInputSchema';

export const UserUpdateOneRequiredWithoutNotesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutNotesInputSchema),z.lazy(() => UserUncheckedCreateWithoutNotesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutNotesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutNotesInputSchema),z.lazy(() => UserUpdateWithoutNotesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutNotesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutNotesNestedInputSchema;
