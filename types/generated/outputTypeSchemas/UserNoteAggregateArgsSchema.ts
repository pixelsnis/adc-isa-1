import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteWhereInputSchema } from '../inputTypeSchemas/UserNoteWhereInputSchema'
import { UserNoteOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserNoteOrderByWithRelationInputSchema'
import { UserNoteWhereUniqueInputSchema } from '../inputTypeSchemas/UserNoteWhereUniqueInputSchema'

export const UserNoteAggregateArgsSchema: z.ZodType<Prisma.UserNoteAggregateArgs> = z.object({
  where: UserNoteWhereInputSchema.optional(),
  orderBy: z.union([ UserNoteOrderByWithRelationInputSchema.array(),UserNoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UserNoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserNoteAggregateArgsSchema;
