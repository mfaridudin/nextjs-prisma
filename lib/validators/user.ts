import { z } from "zod";


export const createUserSchema = z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    username: z.string().min(1),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    address: z.string().min(1),
    dateOfBirth: z.string().min(1),
    age: z.number().min(1),
    roleId: z.number().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
