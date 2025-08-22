import { z } from "zod";
export const healthEntrySchema = z.object({
    global: z.number(),
    physical: z.number(),
    mental: z.number(),
    feeling: z.string().optional(),
    description: z.string().optional(),
    limbs: z.string().optional(),
    createdAt: z.string().transform((str) => new Date(str)).optional().default(new Date()),
});
export const healthEntriesSchema = z.array(healthEntrySchema);