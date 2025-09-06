import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteWhereUniqueInputSchema } from './UserNoteWhereUniqueInputSchema';
import { UserNoteCreateWithoutUserInputSchema } from './UserNoteCreateWithoutUserInputSchema';
import { UserNoteUncheckedCreateWithoutUserInputSchema } from './UserNoteUncheckedCreateWithoutUserInputSchema';

export const UserNoteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserNoteCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserNoteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserNoteCreateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserNoteCreateOrConnectWithoutUserInputSchema;
