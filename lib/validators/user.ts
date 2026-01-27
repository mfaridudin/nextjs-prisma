import { z } from "zod";


export const createUserSchema = z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    username: z.string().optional(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    age: z.number().optional(),
    roleId: z.number().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
