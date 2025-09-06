import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteCreateManyInputSchema } from '../inputTypeSchemas/UserNoteCreateManyInputSchema'

export const UserNoteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserNoteCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserNoteCreateManyInputSchema,UserNoteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export default UserNoteCreateManyAndReturnArgsSchema;
