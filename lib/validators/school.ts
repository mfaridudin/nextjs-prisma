import { EducationLevel } from "@/app/generated/prisma/enums";
import { z } from "zod";

export const createSchoolSchema = z.object({
    name: z.string().nonempty("Name is required"),
    address: z.string().nonempty("Address is required"),
    slug: z.string().nonempty("Slug is required"),
    educationLevel: z
        .nativeEnum(EducationLevel)
        .refine((val) => val !== undefined && val !== null, {
            message: "The required education level is selected",
        }),
})
