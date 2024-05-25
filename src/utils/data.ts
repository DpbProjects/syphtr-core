import { unstable_noStore as noStore } from "next/cache";

import { and, count, eq, ilike } from "drizzle-orm";
import { db } from "@/server/db";

import type { FormValues } from "./types";

// schema
import {
  job,
  sharedRawProfile,
  experience,
  education,
} from "@/server/db/schema";

// shared profiles
/**
 *
 * @todo
 * [] error handling
 * [] validation
 * [] performance optimization
 */
export const fetchSharedProfiles = async (formValues: FormValues) => {
  noStore();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { fullName, state, country, city } = formValues;

  const data = await db
    .select()
    .from(sharedRawProfile)
    .limit(8)
    .leftJoin(experience, eq(experience.profileId, sharedRawProfile.id))
    .leftJoin(education, eq(education.profileId, sharedRawProfile.id))
    .where(
      and(
        fullName
          ? ilike(sharedRawProfile.firstName, `${fullName}%`)
          : undefined,
        city ? ilike(sharedRawProfile.city, `${city}%`) : undefined,
        state ? ilike(sharedRawProfile.state, `${state}%`) : undefined,
        country
          ? ilike(sharedRawProfile.countryFullName, `${country}%`)
          : undefined,
      ),
    );

  return data;
};

export const fetchSharedProfilesPages = async () => {
  noStore();

  const name = "james";

  const query = db
    .select()
    .from(sharedRawProfile)
    .where(ilike(sharedRawProfile.firstName, `${name}%`))
    .limit(4)
    .offset(4);

  const data = await query;

  return data;
};

export const fetchSharedProfileCount = async () => {
  noStore();

  const data = await db.select({ count: count() }).from(sharedRawProfile);

  return data;
};

// ========= JOBS ========== //

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

const ITEMS_PER_PAGE = 8;

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
