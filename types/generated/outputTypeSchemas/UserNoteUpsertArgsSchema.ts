import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteIncludeSchema } from '../inputTypeSchemas/UserNoteIncludeSchema'
import { UserNoteWhereUniqueInputSchema } from '../inputTypeSchemas/UserNoteWhereUniqueInputSchema'
import { UserNoteCreateInputSchema } from '../inputTypeSchemas/UserNoteCreateInputSchema'
import { UserNoteUncheckedCreateInputSchema } from '../inputTypeSchemas/UserNoteUncheckedCreateInputSchema'
import { UserNoteUpdateInputSchema } from '../inputTypeSchemas/UserNoteUpdateInputSchema'
import { UserNoteUncheckedUpdateInputSchema } from '../inputTypeSchemas/UserNoteUncheckedUpdateInputSchema'
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

export const UserNoteUpsertArgsSchema: z.ZodType<Prisma.UserNoteUpsertArgs> = z.object({
  select: UserNoteSelectSchema.optional(),
  include: z.lazy(() => UserNoteIncludeSchema).optional(),
  where: UserNoteWhereUniqueInputSchema,
  create: z.union([ UserNoteCreateInputSchema,UserNoteUncheckedCreateInputSchema ]),
  update: z.union([ UserNoteUpdateInputSchema,UserNoteUncheckedUpdateInputSchema ]),
}).strict() ;

export default UserNoteUpsertArgsSchema;
