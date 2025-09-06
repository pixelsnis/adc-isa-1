import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';
import { UserNoteFindManyArgsSchema } from "../outputTypeSchemas/UserNoteFindManyArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  joinedAt: z.boolean().optional(),
  notes: z.union([z.boolean(),z.lazy(() => UserNoteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default UserSelectSchema;
