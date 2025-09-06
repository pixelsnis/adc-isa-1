import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteIncludeSchema } from '../inputTypeSchemas/UserNoteIncludeSchema'
import { UserNoteCreateInputSchema } from '../inputTypeSchemas/UserNoteCreateInputSchema'
import { UserNoteUncheckedCreateInputSchema } from '../inputTypeSchemas/UserNoteUncheckedCreateInputSchema'
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

export const UserNoteCreateArgsSchema: z.ZodType<Prisma.UserNoteCreateArgs> = z.object({
  select: UserNoteSelectSchema.optional(),
  include: z.lazy(() => UserNoteIncludeSchema).optional(),
  data: z.union([ UserNoteCreateInputSchema,UserNoteUncheckedCreateInputSchema ]),
}).strict() ;

export default UserNoteCreateArgsSchema;
