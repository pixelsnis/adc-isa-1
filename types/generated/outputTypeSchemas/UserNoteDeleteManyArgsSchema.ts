import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteWhereInputSchema } from '../inputTypeSchemas/UserNoteWhereInputSchema'

export const UserNoteDeleteManyArgsSchema: z.ZodType<Prisma.UserNoteDeleteManyArgs> = z.object({
  where: UserNoteWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default UserNoteDeleteManyArgsSchema;
