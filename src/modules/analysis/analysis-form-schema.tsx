import { z } from "zod";

export const analysisFormSchema = z.object({
   username: z.string().min(1),
});

export type AnalysisForm = z.infer<typeof analysisFormSchema>;
