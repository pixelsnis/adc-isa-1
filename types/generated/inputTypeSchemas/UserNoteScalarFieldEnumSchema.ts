import { z } from 'zod';

export const UserNoteScalarFieldEnumSchema = z.enum(['id','content','createdAt','userId']);

export default UserNoteScalarFieldEnumSchema;
