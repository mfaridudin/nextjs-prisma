import { z } from "zod";

export const createClassroomSchema = z.object({
    name: z.string().nonempty("Name is required"),
    slug: z.string().nonempty("Slug is required"),
    schoolId: z.number().positive("School ID Is not valid"),
    teacherId: z.number().positive("Teacher ID Is not valid"),
})
