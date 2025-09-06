import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteIncludeSchema } from '../inputTypeSchemas/UserNoteIncludeSchema'
import { UserNoteWhereInputSchema } from '../inputTypeSchemas/UserNoteWhereInputSchema'
import { UserNoteOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserNoteOrderByWithRelationInputSchema'
import { UserNoteWhereUniqueInputSchema } from '../inputTypeSchemas/UserNoteWhereUniqueInputSchema'
import { UserNoteScalarFieldEnumSchema } from '../inputTypeSchemas/UserNoteScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserNoteSelectSchema: z.ZodType<Prisma.UserNoteSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserNoteFindFirstArgsSchema: z.ZodType<Prisma.UserNoteFindFirstArgs> = z.object({
  select: UserNoteSelectSchema.optional(),
  include: z.lazy(() => UserNoteIncludeSchema).optional(),
  where: UserNoteWhereInputSchema.optional(),
  orderBy: z.union([ UserNoteOrderByWithRelationInputSchema.array(),UserNoteOrderByWithRelationInputSchema ]).optional(),
  cursor: UserNoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserNoteScalarFieldEnumSchema,UserNoteScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default UserNoteFindFirstArgsSchema;
