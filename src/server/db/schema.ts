import {
  pgTable,
  foreignKey,
  pgEnum,
  serial,
  integer,
  text,
  timestamp,
  uniqueIndex,
  doublePrecision,
  index,
  varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const companySize = pgEnum("CompanySize", [
  "SEED",
  "STARTUP",
  "SCALEUP",
  "MID_SIZE",
  "BIG",
  "HUGE",
]);
export const outcomeResult = pgEnum("OutcomeResult", [
  "ONE",
  "TWO",
  "THREE",
  "FOUR",
  "FIVE",
]);
export const stage = pgEnum("Stage", [
  "APPLIED",
  "ADDED",
  "ASK_SYPHTR_TO_REACH_OUT",
  "SCREENING",
  "SCREENED",
  "FIRST_INTERVIEW",
  "MID_INTERVIEWS",
  "FINAL_INTERVIEW",
  "HIRED",
]);

export const activity = pgTable("Activity", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  activityStatus: text("activityStatus"),
  link: text("link"),
  title: text("title"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const article = pgTable("Article", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  title: text("title"),
  link: text("link"),
  publishedDate: timestamp("publishedDate", { precision: 3, mode: "string" }),
  author: text("author"),
  imageUrl: text("imageUrl"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const categoryScore = pgTable(
  "CategoryScore",
  {
    id: serial("id").primaryKey().notNull(),
    categoryId: integer("categoryId")
      .notNull()
      .references(() => category.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    sharedRawProfileId: integer("sharedRawProfileId")
      .notNull()
      .references(() => sharedRawProfile.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    score: doublePrecision("score").notNull(),
    companies: text("companies").array(),
    categoryExperience: doublePrecision("categoryExperience").notNull(),
    categoryName: text("categoryName"),
  },
  (table) => {
    return {
      categoryIdSharedRawProfileIdKey: uniqueIndex(
        "CategoryScore_categoryId_sharedRawProfileId_key",
      ).on(table.categoryId, table.sharedRawProfileId),
    };
  },
);

export const accomplishmentOrg = pgTable("AccomplishmentOrg", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  orgName: text("orgName"),
  title: text("title"),
  description: text("description"),
  startsAt: timestamp("startsAt", { precision: 3, mode: "string" }),
  endsAt: timestamp("endsAt", { precision: 3, mode: "string" }),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const candidateStage = pgTable(
  "CandidateStage",
  {
    id: serial("id").primaryKey().notNull(),
    profileId: integer("profileId")
      .notNull()
      .references(() => profile.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    jobId: integer("jobId")
      .notNull()
      .references(() => job.id, { onDelete: "restrict", onUpdate: "cascade" }),
    stage: stage("stage").notNull(),
    categoryScore: doublePrecision("categoryScore"),
    comfortZoneScore: doublePrecision("comfortZoneScore"),
    overallScore: doublePrecision("overallScore"),
    stabilityScore: doublePrecision("stabilityScore"),
    recentCategoryScore: doublePrecision("recentCategoryScore"),
    orgId: text("orgId"),
  },
  (table) => {
    return {
      profileIdJobIdKey: uniqueIndex("CandidateStage_profileId_jobId_key").on(
        table.profileId,
        table.jobId,
      ),
    };
  },
);

export const category = pgTable(
  "Category",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Category_name_key").on(table.name),
    };
  },
);

export const certification = pgTable("Certification", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  authority: text("authority"),
  displaySource: text("displaySource"),
  endsAt: timestamp("endsAt", { precision: 3, mode: "string" }),
  licenseNumber: text("licenseNumber"),
  name: text("name"),
  startsAt: timestamp("startsAt", { precision: 3, mode: "string" }),
  url: text("url"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const companyProductCategory = pgTable(
  "CompanyProductCategory",
  {
    id: serial("id").primaryKey().notNull(),
    companyId: integer("companyId")
      .notNull()
      .references(() => company.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    productId: integer("productId")
      .notNull()
      .references(() => product.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    categoryId: integer("categoryId")
      .notNull()
      .references(() => category.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    percentage: integer("percentage").notNull(),
  },
  (table) => {
    return {
      companyIdProductIdCategoryIdKey: uniqueIndex(
        "CompanyProductCategory_companyId_productId_categoryId_key",
      ).on(table.companyId, table.productId, table.categoryId),
    };
  },
);

export const company = pgTable(
  "Company",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    targetMarketSize: text("targetMarketSize").notNull(),
    targetVertical: text("targetVertical").notNull(),
    size: companySize("size"),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Company_name_key").on(table.name),
    };
  },
);

export const client = pgTable(
  "Client",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name"),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Client_name_key").on(table.name),
    };
  },
);

export const education = pgTable("Education", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  school: text("school"),
  degreeName: text("degree_name"),
  fieldOfStudy: text("field_of_study"),
  startsAt: timestamp("starts_at", { precision: 3, mode: "string" }),
  endsAt: timestamp("ends_at", { precision: 3, mode: "string" }),
  description: text("description"),
  activitiesAndSocieties: text("activities_and_societies"),
  grade: text("grade"),
  logoUrl: text("logo_url"),
  schoolLinkedinProfileUrl: text("school_linkedin_profile_url"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const job = pgTable("Job", {
  id: serial("id").primaryKey().notNull(),
  clientId: integer("clientId").references(() => client.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  department: text("department"),
  businessUnit: text("businessUnit"),
  hiringTeam: text("hiringTeam").array(),
  title: text("title"),
  salary: integer("salary"),
  currency: text("currency"),
  openSince: timestamp("openSince", { precision: 3, mode: "string" }),
  createdAt: timestamp("createdAt", {
    precision: 3,
    mode: "string",
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }),
  userId: text("userId"),
  description: text("description"),
  jobDescription: text("jobDescription"),
  location: text("location"),
  orgId: text("orgId"),
});

export const experience = pgTable(
  "Experience",
  {
    id: serial("id").primaryKey().notNull(),
    profileId: integer("profileId").references(() => profile.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    company: text("company"),
    title: text("title"),
    description: text("description"),
    location: text("location"),
    startsAt: timestamp("starts_at", { precision: 3, mode: "string" }),
    endsAt: timestamp("ends_at", { precision: 3, mode: "string" }),
    companyLinkedinProfileUrl: text("company_linkedin_profile_url"),
    logoUrl: text("logo_url"),
    sharedRawProfileId: integer("sharedRawProfileId").references(
      () => sharedRawProfile.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
  },
  (table) => {
    return {
      companyIdx: index("Experience_company_idx").on(table.company),
      titleCompanyStartsAtEndsAtIdx: index(
        "Experience_title_company_starts_at_ends_at_idx",
      ).on(table.company, table.title, table.startsAt, table.endsAt),
      titleIdx: index("Experience_title_idx").on(table.title),
    };
  },
);

export const course = pgTable("Course", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  name: text("name"),
  number: text("number"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const group = pgTable("Group", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  profilePicUrl: text("profilePicUrl"),
  name: text("name"),
  url: text("url"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const honourAward = pgTable("HonourAward", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  title: text("title"),
  issuer: text("issuer"),
  issuedOn: timestamp("issuedOn", { precision: 3, mode: "string" }),
  description: text("description"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const interview = pgTable("Interview", {
  id: serial("id").primaryKey().notNull(),
  candidateStageId: integer("candidateStageId").references(
    () => candidateStage.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
  userId: text("userId"),
  date: timestamp("date", { precision: 3, mode: "string" }),
  outcome: outcomeResult("outcome"),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }).notNull(),
  interviewers: text("interviewers").array(),
  attendees: text("attendees").array(),
  endTime: timestamp("endTime", { precision: 3, mode: "string" }),
  startTime: timestamp("startTime", { precision: 3, mode: "string" }),
  messages: text("messages"),
  eventId: text("eventId"),
});

export const jobHistory = pgTable("JobHistory", {
  id: serial("id").primaryKey().notNull(),
  jobId: integer("jobId")
    .notNull()
    .references(() => job.id, { onDelete: "restrict", onUpdate: "cascade" }),
  userId: text("userId").notNull(),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  details: text("details").notNull(),
});

export const language = pgTable("Language", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  language: text("language").notNull(),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const linkedInProfileViews = pgTable(
  "LinkedInProfileViews",
  {
    id: serial("id").primaryKey().notNull(),
    profileId: integer("profileId").references(() => profile.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    orgId: text("orgId").notNull(),
    userId: text("userId"),
    viewedAt: timestamp("viewedAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
    sharedRawProfileId: integer("sharedRawProfileId").references(
      () => sharedRawProfile.id,
      { onDelete: "set null", onUpdate: "cascade" },
    ),
  },
  (table) => {
    return {
      profileId: index("profileId").on(table.profileId),
    };
  },
);

export const notification = pgTable("Notification", {
  id: serial("id").primaryKey().notNull(),
  userId: text("userId").notNull(),
  profileId: integer("profileId").notNull(),
  profileName: text("profileName").notNull(),
  profilePicUrl: text("profilePicUrl").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const profile = pgTable(
  "Profile",
  {
    id: serial("id").primaryKey().notNull(),
    publicIdentifier: text("public_identifier"),
    firstName: text("first_name"),
    lastName: text("last_name"),
    fullName: text("full_name"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    countryFullName: text("country_full_name"),
    summary: text("summary"),
    profilePicUrl: text("profile_pic_url"),
    backgroundCoverImageUrl: text("background_cover_image_url"),
    headline: text("headline"),
    occupation: text("occupation"),
    connections: integer("connections"),
    followerCount: integer("follower_count"),
    recommendations: text("recommendations").array(),
    skills: text("skills").array(),
    lastUpdated: timestamp("last_updated", { precision: 3, mode: "string" }),
    linkedinProfileUrl: text("linkedin_profile_url").notNull(),
    talentPoolId: integer("talentPoolId").references(() => talentPool.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),
    orgId: text("orgId"),
    userId: text("userId"),
    emailAddress: text("email_address"),
    phoneNumber: text("phone_number"),
  },
  (table) => {
    return {
      publicIdentifierOrgIdKey: uniqueIndex(
        "Profile_public_identifier_orgId_key",
      ).on(table.publicIdentifier, table.orgId),
    };
  },
);

export const sharedRawProfile = pgTable(
  "SharedRawProfile",
  {
    id: serial("id").primaryKey().notNull(),
    publicIdentifier: text("public_identifier"),
    linkedinProfileUrl: text("linkedin_profile_url").notNull(),
    lastUpdated: timestamp("last_updated", { precision: 3, mode: "string" }),
    firstName: text("first_name"),
    lastName: text("last_name"),
    fullName: text("full_name"),
    city: text("city"),
    state: text("state"),
    country: text("country"),
    countryFullName: text("country_full_name"),
    summary: text("summary"),
    profilePicUrl: text("profile_pic_url"),
    backgroundCoverImageUrl: text("background_cover_image_url"),
    headline: text("headline"),
    occupation: text("occupation"),
    connections: integer("connections"),
    followerCount: integer("follower_count"),
    recommendations: text("recommendations").array(),
    skills: text("skills").array(),
    stabilityScoreDb: doublePrecision("stabilityScoreDB"),
    comfortZoneScore: doublePrecision("comfortZoneScore"),
    averageTenureScore: doublePrecision("averageTenureScore"),
  },
  (table) => {
    return {
      publicIdentifierKey: uniqueIndex(
        "SharedRawProfile_public_identifier_key",
      ).on(table.publicIdentifier),
    };
  },
);

export const sharedRawProfileRelations = relations(
  sharedRawProfile,
  ({ many }) => ({
    experience: many(experience),
    education: many(education),
    // job: many(jobCandidates),
    jobCandidates: many(jobCandidates),
  }),
);

export const educationToSharedProfileRelations = relations(
  education,
  ({ one }) => ({
    education: one(sharedRawProfile, {
      fields: [education.profileId],
      references: [sharedRawProfile.id],
    }),
  }),
);

export const experienceToSharedProfileRelations = relations(
  experience,
  ({ one }) => ({
    experience: one(sharedRawProfile, {
      fields: [experience.sharedRawProfileId],
      references: [sharedRawProfile.id],
    }),
  }),
);

export const product = pgTable(
  "Product",
  {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    companyId: integer("companyId")
      .notNull()
      .references(() => company.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      nameKey: uniqueIndex("Product_name_key").on(table.name),
    };
  },
);

export const patent = pgTable("Patent", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  title: text("title"),
  issuer: text("issuer"),
  issuedOn: timestamp("issuedOn", { precision: 3, mode: "string" }),
  description: text("description"),
  applicationNumber: text("applicationNumber"),
  patentNumber: text("patentNumber"),
  url: text("url"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const peopleAlsoViewed = pgTable("PeopleAlsoViewed", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  link: text("link"),
  name: text("name"),
  summary: text("summary"),
  location: text("location"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const profileOrg = pgTable(
  "ProfileOrg",
  {
    id: serial("id").primaryKey().notNull(),
    profileId: integer("profileId")
      .notNull()
      .references(() => profile.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    orgId: text("orgId").notNull(),
    publicIdentifier: text("public_identifier"),
  },
  (table) => {
    return {
      publicIdentifierOrgIdKey: uniqueIndex(
        "ProfileOrg_public_identifier_orgId_key",
      ).on(table.orgId, table.publicIdentifier),
    };
  },
);

export const talentPool = pgTable("TalentPool", {
  id: serial("id").primaryKey().notNull(),
  orgId: text("orgId").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }).notNull(),
  name: text("name").notNull(),
});

export const project = pgTable("Project", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  title: text("title"),
  description: text("description"),
  url: text("url"),
  startsAt: timestamp("startsAt", { precision: 3, mode: "string" }),
  endsAt: timestamp("endsAt", { precision: 3, mode: "string" }),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const publication = pgTable("Publication", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  name: text("name"),
  publisher: text("publisher"),
  publishedOn: timestamp("publishedOn", { precision: 3, mode: "string" }),
  description: text("description"),
  url: text("url"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const recentCategoryScore = pgTable(
  "RecentCategoryScore",
  {
    id: serial("id").primaryKey().notNull(),
    categoryId: integer("categoryId")
      .notNull()
      .references(() => category.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    sharedRawProfileId: integer("sharedRawProfileId")
      .notNull()
      .references(() => sharedRawProfile.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    score: doublePrecision("score").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      sharedRawProfileIdCategoryIdKey: uniqueIndex(
        "RecentCategoryScore_sharedRawProfileId_categoryId_key",
      ).on(table.categoryId, table.sharedRawProfileId),
      idxRecentCategoryScore: index("idx_recentCategoryScore").on(
        table.categoryId,
        table.sharedRawProfileId,
      ),
    };
  },
);

export const sensitiveProfileData = pgTable(
  "SensitiveProfileData",
  {
    id: serial("id").primaryKey().notNull(),
    email: text("email"),
    phone: text("phone"),
    cv: text("cv"),
    notes: text("notes"),
    profileId: integer("profileId")
      .notNull()
      .references(() => profile.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),
    userId: text("userId"),
    orgId: text("orgId"),
  },
  (table) => {
    return {
      profileIdUserIdKey: uniqueIndex(
        "SensitiveProfileData_profileId_userId_key",
      ).on(table.profileId, table.userId),
    };
  },
);

export const similarProfile = pgTable("SimilarProfile", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  name: text("name"),
  link: text("link"),
  summary: text("summary"),
  location: text("location"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const testScore = pgTable("TestScore", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  name: text("name"),
  score: text("score"),
  dateOn: timestamp("dateOn", { precision: 3, mode: "string" }),
  description: text("description"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const volunteerWork = pgTable("VolunteerWork", {
  id: serial("id").primaryKey().notNull(),
  profileId: integer("profileId").references(() => profile.id, {
    onDelete: "set null",
    onUpdate: "cascade",
  }),
  cause: text("cause"),
  company: text("company"),
  companyLinkedinProfileUrl: text("companyLinkedinProfileUrl"),
  description: text("description"),
  endsAt: timestamp("endsAt", { precision: 3, mode: "string" }),
  logoUrl: text("logoUrl"),
  startsAt: timestamp("startsAt", { precision: 3, mode: "string" }),
  title: text("title"),
  sharedRawProfileId: integer("sharedRawProfileId").references(
    () => sharedRawProfile.id,
    { onDelete: "set null", onUpdate: "cascade" },
  ),
});

export const jobCandidates = pgTable(
  "_JobCandidates",
  {
    a: integer("A")
      .notNull()
      .references(() => job.id, { onDelete: "cascade", onUpdate: "cascade" }),
    b: integer("B")
      .notNull()
      .references(() => profile.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      abUnique: uniqueIndex("_JobCandidates_AB_unique").on(table.a, table.b),
      bIdx: index().on(table.b),
    };
  },
);

export const prismaMigrations = pgTable("_prisma_migrations", {
  id: varchar("id", { length: 36 }).primaryKey().notNull(),
  checksum: varchar("checksum", { length: 64 }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true, mode: "string" }),
  migrationName: varchar("migration_name", { length: 255 }).notNull(),
  logs: text("logs"),
  rolledBackAt: timestamp("rolled_back_at", {
    withTimezone: true,
    mode: "string",
  }),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});
