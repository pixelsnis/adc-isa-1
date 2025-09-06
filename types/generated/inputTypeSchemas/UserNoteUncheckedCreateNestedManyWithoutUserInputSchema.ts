import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteCreateWithoutUserInputSchema } from './UserNoteCreateWithoutUserInputSchema';
import { UserNoteUncheckedCreateWithoutUserInputSchema } from './UserNoteUncheckedCreateWithoutUserInputSchema';
import { UserNoteCreateOrConnectWithoutUserInputSchema } from './UserNoteCreateOrConnectWithoutUserInputSchema';
import { UserNoteCreateManyUserInputEnvelopeSchema } from './UserNoteCreateManyUserInputEnvelopeSchema';
import { UserNoteWhereUniqueInputSchema } from './UserNoteWhereUniqueInputSchema';

export const UserNoteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserNoteUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserNoteCreateWithoutUserInputSchema),z.lazy(() => UserNoteCreateWithoutUserInputSchema).array(),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserNoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserNoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserNoteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserNoteWhereUniqueInputSchema),z.lazy(() => UserNoteWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default UserNoteUncheckedCreateNestedManyWithoutUserInputSchema;
