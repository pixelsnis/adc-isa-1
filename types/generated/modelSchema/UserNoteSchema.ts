import { z } from 'zod';

/////////////////////////////////////////
// USER NOTE SCHEMA
/////////////////////////////////////////

export const UserNoteSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  userId: z.string(),
})

export type UserNote = z.infer<typeof UserNoteSchema>

export default UserNoteSchema;
