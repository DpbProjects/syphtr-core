import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/server/db";
import { z } from "zod";
import { job } from "@/server/db/schema";

const JobFormData = z.object({
  id: z.number(), // Assuming it's a number
  clientId: z.number().nullable(),
  department: z.string().nullable(),
  businessUnit: z.string().nullable(),
  hiringTeam: z.array(z.string()),
  title: z.string().nullable(),
  salary: z.number().nullable(),
  currency: z.string().nullable(),
  openSince: z.string().nullable(), // Assuming it's a string
  createdAt: z.string().nullable(), // Assuming it's a string
  updatedAt: z.string().nullable(), // Assuming it's a string
  userId: z.string().nullable(),
  description: z.string().nullable(),
  jobDescription: z.string().nullable(),
  location: z.string().nullable(),
  orgId: z.string().nullable(),
});

const CreateJobSchema = JobFormData.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// jobs

export async function createJob(formData: FormData) {
  try {
    // Parse form data using Zod schema
    const {
      clientId,
      department,
      businessUnit,
      hiringTeam,
      title,
      salary,
      currency,
      openSince,
      userId,
      description,
      jobDescription,
      location,
      orgId,
    } = CreateJobSchema.parse({
      clientId: formData.get("clientId"),
      department: formData.get("department"),
      businessUnit: formData.get("businessUnit"),
      hiringTeam: formData.getAll("hiringTeam"),
      title: formData.get("title"),
      salary: formData.get("salary"),
      currency: formData.get("currency"),
      openSince: formData.get("openSince"),
      userId: formData.get("userId"),
      description: formData.get("description"),
      jobDescription: formData.get("jobDescription"),
      location: formData.get("location"),
      orgId: formData.get("orgId"),
    });

    // Create a new job record using Drizzle ORM
    const newJob = await db.insert(job).values({
      clientId,
      department,
      businessUnit,
      hiringTeam,
      title,
      salary,
      currency,
      openSince,
      userId,
      description,
      jobDescription,
      location,
      orgId,
    });

    // After creating the job, perform any necessary actions
    revalidatePath("/dashboard/jobs");
    redirect("/dashboard/jobs");

    return newJob;
  } catch (error) {
    // Handle validation errors or database errors
    console.error("Error creating job:", error);
    // Optionally, rethrow the error for further handling
    throw error;
  }
}
