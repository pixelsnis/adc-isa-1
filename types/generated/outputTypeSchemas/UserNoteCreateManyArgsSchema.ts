import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteCreateManyInputSchema } from '../inputTypeSchemas/UserNoteCreateManyInputSchema'

export const UserNoteCreateManyArgsSchema: z.ZodType<Prisma.UserNoteCreateManyArgs> = z.object({
  data: z.union([ UserNoteCreateManyInputSchema,UserNoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default UserNoteCreateManyArgsSchema;
