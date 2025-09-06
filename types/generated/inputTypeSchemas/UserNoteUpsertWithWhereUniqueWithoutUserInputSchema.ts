import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteWhereUniqueInputSchema } from './UserNoteWhereUniqueInputSchema';
import { UserNoteUpdateWithoutUserInputSchema } from './UserNoteUpdateWithoutUserInputSchema';
import { UserNoteUncheckedUpdateWithoutUserInputSchema } from './UserNoteUncheckedUpdateWithoutUserInputSchema';
import { UserNoteCreateWithoutUserInputSchema } from './UserNoteCreateWithoutUserInputSchema';
import { UserNoteUncheckedCreateWithoutUserInputSchema } from './UserNoteUncheckedCreateWithoutUserInputSchema';

export const UserNoteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserNoteUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserNoteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserNoteUpdateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserNoteCreateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserNoteUpsertWithWhereUniqueWithoutUserInputSchema;
