import { z } from "zod";


export const createUserSchema = z.object({
    fullName: z.string().nonempty("Full Name is required"),
    email: z.string().nonempty("Email is required").email(),
    username: z.string().nonempty("Username is required"),
    password: z.string().nonempty("Password is required"),
    password_confirmation: z.string().nonempty("Confirm password is required"),
    address: z.string().nonempty("Address is required"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    age: z.number().min(1),
    profile: z.string().optional(),
    emailVerified: z.boolean().optional(),
    roleId: z.number().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
