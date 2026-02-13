import { z } from "zod";

export const EducationLevelEnum = z.enum([
    "PRIMARY_SCHOOL",
    "JUNIOR_HIGH_SCHOOL",
    "SENIOR_HIGH_SCHOOL",
]);

export const createSchoolSchema = z.object({
    name: z.string().nonempty("Name is required"),
    address: z.string().nonempty("Address is required"),
    slug: z.string().nonempty("Slug is required"),
    educationLevel: EducationLevelEnum,
});
