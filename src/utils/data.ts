import { unstable_noStore as noStore } from "next/cache";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";

// schema
import { profile } from "@/server/db/schema";

// PROFILES
export const fetchProfiles = async () => {
  noStore();
  const response = await db.query.profile.findMany({
    where: eq(profile.firstName, "John"),
    with: {
      experience: true,
      education: true,
    },
  });

  return response;
};

// JOBS
export const fetchJobs = async () => {
  noStore();
  const response = await db.query.job.findMany();

  return response;
};
