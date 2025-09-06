import type { Prisma } from '../../../node_modules/.prisma/client';

import { z } from 'zod';
import { UserNoteCreateManyUserInputSchema } from './UserNoteCreateManyUserInputSchema';

export const UserNoteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserNoteCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserNoteCreateManyUserInputSchema),z.lazy(() => UserNoteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default UserNoteCreateManyUserInputEnvelopeSchema;
