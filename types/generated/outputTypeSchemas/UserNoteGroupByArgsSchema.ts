import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteWhereInputSchema } from '../inputTypeSchemas/UserNoteWhereInputSchema'
import { UserNoteOrderByWithAggregationInputSchema } from '../inputTypeSchemas/UserNoteOrderByWithAggregationInputSchema'
import { UserNoteScalarFieldEnumSchema } from '../inputTypeSchemas/UserNoteScalarFieldEnumSchema'
import { UserNoteScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/UserNoteScalarWhereWithAggregatesInputSchema'

export const UserNoteGroupByArgsSchema: z.ZodType<Prisma.UserNoteGroupByArgs> = z.object({
  where: UserNoteWhereInputSchema.optional(),
  orderBy: z.union([ UserNoteOrderByWithAggregationInputSchema.array(),UserNoteOrderByWithAggregationInputSchema ]).optional(),
  by: UserNoteScalarFieldEnumSchema.array(),
  having: UserNoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default UserNoteGroupByArgsSchema;
