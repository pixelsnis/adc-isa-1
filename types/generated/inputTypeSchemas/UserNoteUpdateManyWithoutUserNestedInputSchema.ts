import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteCreateWithoutUserInputSchema } from './UserNoteCreateWithoutUserInputSchema';
import { UserNoteUncheckedCreateWithoutUserInputSchema } from './UserNoteUncheckedCreateWithoutUserInputSchema';
import { UserNoteCreateOrConnectWithoutUserInputSchema } from './UserNoteCreateOrConnectWithoutUserInputSchema';
import { UserNoteUpsertWithWhereUniqueWithoutUserInputSchema } from './UserNoteUpsertWithWhereUniqueWithoutUserInputSchema';
import { UserNoteCreateManyUserInputEnvelopeSchema } from './UserNoteCreateManyUserInputEnvelopeSchema';
import { UserNoteWhereUniqueInputSchema } from './UserNoteWhereUniqueInputSchema';
import { UserNoteUpdateWithWhereUniqueWithoutUserInputSchema } from './UserNoteUpdateWithWhereUniqueWithoutUserInputSchema';
import { UserNoteUpdateManyWithWhereWithoutUserInputSchema } from './UserNoteUpdateManyWithWhereWithoutUserInputSchema';
import { UserNoteScalarWhereInputSchema } from './UserNoteScalarWhereInputSchema';

export const UserNoteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserNoteUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserNoteCreateWithoutUserInputSchema),z.lazy(() => UserNoteCreateWithoutUserInputSchema).array(),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserNoteCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserNoteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserNoteUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserNoteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserNoteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserNoteWhereUniqueInputSchema),z.lazy(() => UserNoteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserNoteWhereUniqueInputSchema),z.lazy(() => UserNoteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserNoteWhereUniqueInputSchema),z.lazy(() => UserNoteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserNoteWhereUniqueInputSchema),z.lazy(() => UserNoteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserNoteUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserNoteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserNoteUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserNoteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserNoteScalarWhereInputSchema),z.lazy(() => UserNoteScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default UserNoteUpdateManyWithoutUserNestedInputSchema;
