import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const UserNoteIncludeSchema: z.ZodType<Prisma.UserNoteInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default UserNoteIncludeSchema;
