import { unstable_noStore as noStore } from "next/cache";

import { and, count, eq, ilike, inArray } from "drizzle-orm";
import { db } from "@/server/db";

import type { FormValues } from "./types";
import { experience } from "@/server/db/schema";

// schema

import { sharedRawProfile } from "@/server/db/schema/profile";
import { job } from "@/server/db/schema/job";

// shared profiles data

export const fetchSharedProfiles = async (formValues: FormValues) => {
  /**
   *
   * @task
   * [] min and max experience
   * [] add checkbox to for current or past role
   * [] excluded words
   * [] split queries in to separate files
   *
   * @todo
   * [] error handling
   * [] validation - zod
   * [] performance optimization
   */

  noStore();

  const { fullName, state, country, city, jobTitle, companyName } = formValues;

  console.log(formValues);

  const sharedProfiles = await db.query.sharedRawProfile.findMany({
    where: and(
      fullName ? ilike(sharedRawProfile.fullName, `${fullName}%`) : undefined,
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
              jobTitle ? ilike(experience.title, `${jobTitle}%`) : undefined,
              // arrayContains(experience.company, `${companyName}%`),
              // inArray(experience.company, ["one.com", "Torch"]),
              // companyName
              //   ?
              //   : undefined,
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

// export const fetchCompaniesInCategory = async (categoryInput: string) => {
//   const query = await db.query.category.findMany({
//     where: eq(category.name, categoryInput),
//     with: {
//       companyProductCategory: {
//         columns: {
//           companyId: true,
//         },
//       },
//     },
//   });

//   const result = query[0]?.companyProductCategory.map(
//     (company: { companyId: any; }) => company.companyId,
//   );

//   if (!result || result.length === 0) {
//     throw new Error("No company IDs provided");
//   }

//   const companies = await db
//     .select()
//     .from(company)
//     .where(inArray(company.id, result));

//   const companiesArray = companies.map((company) => company.name);

//   console.log(companiesArray);

//   return companiesArray;
// };

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
    // with: {
    //   jobCandidates: {
    //     with: {
    //       profile: true,
    //     },
    //   },
    // },
  });

  return response;
};

// CATEGORY

export const fetchCategories = async () => {
  noStore();
  const response = await db.query.category.findMany({
    with: {
      companyProductCategory: true,
    },
  });

  return response;
};
