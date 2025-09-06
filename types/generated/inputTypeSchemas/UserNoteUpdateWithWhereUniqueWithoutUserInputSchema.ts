import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteWhereUniqueInputSchema } from './UserNoteWhereUniqueInputSchema';
import { UserNoteUpdateWithoutUserInputSchema } from './UserNoteUpdateWithoutUserInputSchema';
import { UserNoteUncheckedUpdateWithoutUserInputSchema } from './UserNoteUncheckedUpdateWithoutUserInputSchema';

export const UserNoteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserNoteUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserNoteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserNoteUpdateWithoutUserInputSchema),z.lazy(() => UserNoteUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default UserNoteUpdateWithWhereUniqueWithoutUserInputSchema;
