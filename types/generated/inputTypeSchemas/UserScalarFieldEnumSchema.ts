import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','joinedAt']);

export default UserScalarFieldEnumSchema;
