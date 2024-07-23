import { z } from "zod";

// const tag = z.object({
//   id: z.string(),
//   text: z.string(),
// });

export const formSchema = z.object({
  fullName: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  softwareCategory: z.string().optional(),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  minExp: z.string().optional(),
  maxExp: z.string().optional(),
  roleDescription: z.string().optional(),
  excludedWords: z.string().optional(),
});
