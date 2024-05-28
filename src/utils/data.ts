import { unstable_noStore as noStore } from "next/cache";

import { and, count, eq, ilike, inArray, not, notIlike } from "drizzle-orm";
import { db } from "@/server/db";

import type { FormValues } from "./types";

// schema
import { job, sharedRawProfile, experience } from "@/server/db/schema";

// shared profiles data

export const fetchSharedProfiles = async (formValues: FormValues) => {
  /**
   *
   * @task
   * [] min and max experience
   * [] add checkbox to for current or past role
   * [] excluded words
   *
   * @todo
   * [] error handling
   * [] validation - zod
   * [] performance optimization
   */

  noStore();

  const { fullName, state, country, city, pastJobTitle, pastJobCompanyName } =
    formValues;

  // const excludedWords = ["Developer", "Company"];

  // fetch and filter
  // add logic to find current or past role
  // add scoring
  // paginate

  const sharedProfiles = await db.query.sharedRawProfile.findMany({
    where: and(
      fullName ? ilike(sharedRawProfile.firstName, `${fullName}%`) : undefined,
      city ? ilike(sharedRawProfile.city, `${city}%`) : undefined,
      state ? ilike(sharedRawProfile.state, `${state}%`) : undefined,
      country
        ? ilike(sharedRawProfile.countryFullName, `${country}%`)
        : undefined,
      inArray(
        sharedRawProfile.id,
        db
          .select({ profileId: experience.sharedRawProfileId })
          .from(experience)
          .where(
            and(
              // excludedWords.length > 0
              //   ? not(inArray(experience.title, excludedWords))
              //   : undefined,
              // excludedWords.length > 0
              //   ? not(inArray(experience.company, excludedWords))
              //   : undefined,
              pastJobTitle
                ? ilike(experience.title, `${pastJobTitle}%`)
                : undefined,
              pastJobCompanyName
                ? ilike(experience.company, `${pastJobCompanyName}%`)
                : undefined,
            ),
          ),
      ),
    ),
    with: {
      experience: true,
      education: true,
    },

    limit: 5,
  });

  return sharedProfiles;
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
