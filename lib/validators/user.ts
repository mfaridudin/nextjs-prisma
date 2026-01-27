import { z } from "zod";

export const createUserSchema = z.object({
    fullName: z.string(),
    username: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    age: z.number().optional(),
    roleId: z.number().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
