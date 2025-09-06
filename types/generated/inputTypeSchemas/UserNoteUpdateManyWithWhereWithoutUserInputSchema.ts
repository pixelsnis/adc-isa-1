import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteScalarWhereInputSchema } from './UserNoteScalarWhereInputSchema';
import { UserNoteUpdateManyMutationInputSchema } from './UserNoteUpdateManyMutationInputSchema';
import { UserNoteUncheckedUpdateManyWithoutUserInputSchema } from './UserNoteUncheckedUpdateManyWithoutUserInputSchema';

export const UserNoteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserNoteUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserNoteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserNoteUpdateManyMutationInputSchema),z.lazy(() => UserNoteUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default UserNoteUpdateManyWithWhereWithoutUserInputSchema;
