import { unstable_noStore as noStore } from "next/cache";

import { eq, like, ilike } from "drizzle-orm";
import { db } from "@/server/db";

// schema
import { profile, job } from "@/server/db/schema";

// profiles
export const fetchProfiles = async (query: string) => {
  noStore();

  const response = await db.query.profile.findMany({
    where: ilike(profile.firstName, `${query}%`),
    limit: 5,
    with: {
      experience: true,
      education: true,
    },
  });

  return response;
};

export const fetchProfilesById = async (profileId: number) => {
  noStore();

  const response = await db.query.profile.findMany({
    where: eq(profile.id, profileId),
    with: {
      experience: true,
      education: true,
    },
  });

  return response;
};

// jobs
export const fetchJobs = async () => {
  noStore();
  const response = await db.query.job.findMany({
    with: {
      jobCandidates: {
        with: {
          profile: true,
        },
      },
    },
  });

  return response;
};

export const fetchJobById = async (jobId: number) => {
  noStore();
  const response = await db.query.job.findMany({
    where: eq(job.id, jobId),
    with: {
      jobCandidates: {
        with: {
          profile: true,
        },
      },
    },
  });

  return response;
};

const ITEMS_PER_PAGE = 5;

export const fetchFilteredJobs = async (query: string, currentPage: number) => {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const response = await db.query.job.findMany({
    limit: 2,
    offset: offset,
    where: eq(job.title, query),
    with: {
      jobCandidates: {
        with: {
          profile: true,
        },
      },
    },
  });

  return response;
};
