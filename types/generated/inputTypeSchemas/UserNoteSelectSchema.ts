import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const UserNoteSelectSchema: z.ZodType<Prisma.UserNoteSelect> = z.object({
  id: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default UserNoteSelectSchema;
