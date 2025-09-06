import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  notes: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
