import { z } from "zod";

export const formSchema = z.object({
  fullName: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  pastJobTitle: z.string().nullable(),
  pastJobCompanyName: z.string().nullable(),
});
