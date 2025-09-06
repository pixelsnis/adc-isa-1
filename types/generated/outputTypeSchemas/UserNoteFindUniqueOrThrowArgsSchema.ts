import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteIncludeSchema } from '../inputTypeSchemas/UserNoteIncludeSchema'
import { UserNoteWhereUniqueInputSchema } from '../inputTypeSchemas/UserNoteWhereUniqueInputSchema'
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

export const UserNoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserNoteFindUniqueOrThrowArgs> = z.object({
  select: UserNoteSelectSchema.optional(),
  include: z.lazy(() => UserNoteIncludeSchema).optional(),
  where: UserNoteWhereUniqueInputSchema,
}).strict() ;

export default UserNoteFindUniqueOrThrowArgsSchema;
