import { z } from "zod";

export const analysisFormSchema = z
   .object({
      username: z.string().min(1),
      startAnalysisDate: z.coerce.date().max(new Date()).nullable(),
      endAnalysisDate: z.coerce.date().max(new Date()).nullable(),
      colors: z.object({
         white: z.boolean(),
         black: z.boolean(),
      }),
      variants: z.object({
         ultraBullet: z.boolean(),
         bullet: z.boolean(),
         blitz: z.boolean(),
         rapid: z.boolean(),
         classical: z.boolean(),
         correspondence: z.boolean(),
      }),
      gameTypes: z.object({
         rated: z.boolean(),
         casual: z.boolean(),
      }),
      opponentUsername: z.string(),
   })
   .refine(
      (data) => {
         if (data.startAnalysisDate && data.endAnalysisDate) {
            return data.startAnalysisDate <= data.endAnalysisDate;
         }
         return true;
      },
      {
         message: "Start of analysis can't be later than End of analysis",
         path: ["startAnalysisDate"],
      },
   );

export const defaultFormValues = {
   username: "",
   startAnalysisDate: null,
   endAnalysisDate: null,
   colors: {
      white: true,
      black: true,
   },
   variants: {
      ultraBullet: true,
      bullet: true,
      blitz: true,
      rapid: true,
      classical: true,
      correspondence: true,
   },
   gameTypes: {
      rated: true,
      casual: true,
   },
   opponentUsername: "",
};

export type AnalysisForm = z.infer<typeof analysisFormSchema>;
