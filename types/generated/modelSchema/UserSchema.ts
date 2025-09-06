import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  joinedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

export default UserSchema;
