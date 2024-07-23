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

// EDUCATION

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

// EXPERIENCE
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

// RELATIONS

export const educationToSharedProfileRelations = relations(
  education,
  ({ one }) => ({
    education: one(sharedRawProfile, {
      fields: [education.sharedRawProfileId],
      references: [sharedRawProfile.id],
    }),
  }),
);

export const educationToProfileRelations = relations(education, ({ one }) => ({
  education: one(profile, {
    fields: [education.profileId],
    references: [profile.id],
  }),
}));

export const experienceToProfileRelations = relations(
  experience,
  ({ one }) => ({
    experience: one(profile, {
      fields: [experience.sharedRawProfileId],
      references: [profile.id],
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

export const talentPool = pgTable("TalentPool", {
  id: serial("id").primaryKey().notNull(),
  orgId: text("orgId").notNull(),
  createdAt: timestamp("createdAt", { precision: 3, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { precision: 3, mode: "string" }).notNull(),
  name: text("name").notNull(),
});
