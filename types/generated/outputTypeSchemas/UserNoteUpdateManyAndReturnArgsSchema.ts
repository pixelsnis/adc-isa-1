import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteUpdateManyMutationInputSchema } from '../inputTypeSchemas/UserNoteUpdateManyMutationInputSchema'
import { UserNoteUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/UserNoteUncheckedUpdateManyInputSchema'
import { UserNoteWhereInputSchema } from '../inputTypeSchemas/UserNoteWhereInputSchema'

export const UserNoteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserNoteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserNoteUpdateManyMutationInputSchema,UserNoteUncheckedUpdateManyInputSchema ]),
  where: UserNoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default UserNoteUpdateManyAndReturnArgsSchema;
