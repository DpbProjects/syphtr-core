-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "CompanySize" AS ENUM('SEED', 'STARTUP', 'SCALEUP', 'MID_SIZE', 'BIG', 'HUGE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "Stage" AS ENUM('APPLIED', 'ADDED', 'ASK_SYPHTR_TO_REACH_OUT', 'SCREENING', 'SCREENED', 'FIRST_INTERVIEW', 'MID_INTERVIEWS', 'FINAL_INTERVIEW', 'HIRED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"activityStatus" text,
	"link" text,
	"title" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Article" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"title" text,
	"link" text,
	"publishedDate" timestamp(3),
	"author" text,
	"imageUrl" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CandidateStage" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer NOT NULL,
	"jobId" integer NOT NULL,
	"stage" "Stage" NOT NULL,
	"categoryScore" double precision,
	"comfortZoneScore" double precision,
	"overallScore" double precision,
	"stabilityScore" double precision,
	"recentCategoryScore" double precision,
	"orgId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Certification" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"authority" text,
	"displaySource" text,
	"endsAt" timestamp(3),
	"licenseNumber" text,
	"name" text,
	"startsAt" timestamp(3),
	"url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Company" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"targetMarketSize" text NOT NULL,
	"targetVertical" text NOT NULL,
	"size" "CompanySize"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Education" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"school" text NOT NULL,
	"degree_name" text NOT NULL,
	"field_of_study" text,
	"starts_at" timestamp(3),
	"ends_at" timestamp(3),
	"description" text,
	"activities_and_societies" text,
	"grade" text,
	"logo_url" text,
	"school_linkedin_profile_url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Client" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AccomplishmentOrg" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"orgName" text,
	"title" text,
	"description" text,
	"startsAt" timestamp(3),
	"endsAt" timestamp(3),
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Course" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"name" text,
	"number" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Group" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"profilePicUrl" text,
	"name" text,
	"url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "HonourAward" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"title" text,
	"issuer" text,
	"issuedOn" timestamp(3),
	"description" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"company" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"location" text,
	"starts_at" timestamp(3),
	"ends_at" timestamp(3),
	"company_linkedin_profile_url" text,
	"logo_url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Job" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer,
	"department" text,
	"businessUnit" text,
	"hiringTeam" text[],
	"title" text,
	"salary" integer,
	"currency" text,
	"openSince" timestamp(3),
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp(3),
	"userId" text,
	"description" text,
	"jobDescription" text,
	"location" text,
	"orgId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "JobHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"jobId" integer NOT NULL,
	"userId" text NOT NULL,
	"action" text NOT NULL,
	"timestamp" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"details" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Notification" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"profileId" integer NOT NULL,
	"profileName" text NOT NULL,
	"profilePicUrl" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PeopleAlsoViewed" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"link" text,
	"name" text,
	"summary" text,
	"location" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ProfileOrg" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer NOT NULL,
	"orgId" text NOT NULL,
	"public_identifier" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Language" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"language" text NOT NULL,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"companyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"title" text,
	"description" text,
	"url" text,
	"startsAt" timestamp(3),
	"endsAt" timestamp(3),
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_identifier" text,
	"first_name" text,
	"last_name" text,
	"full_name" text,
	"city" text,
	"state" text,
	"country" text,
	"country_full_name" text,
	"summary" text,
	"profile_pic_url" text,
	"background_cover_image_url" text,
	"headline" text,
	"occupation" text,
	"connections" integer,
	"follower_count" integer,
	"recommendations" text[],
	"skills" text[],
	"last_updated" timestamp(3),
	"linkedin_profile_url" text NOT NULL,
	"talentPoolId" integer,
	"orgId" text,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Patent" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"title" text,
	"issuer" text,
	"issuedOn" timestamp(3),
	"description" text,
	"applicationNumber" text,
	"patentNumber" text,
	"url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SimilarProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"name" text,
	"link" text,
	"summary" text,
	"location" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TalentPool" (
	"id" serial PRIMARY KEY NOT NULL,
	"orgId" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "TestScore" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"name" text,
	"score" text,
	"dateOn" timestamp(3),
	"description" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Publication" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"name" text,
	"publisher" text,
	"publishedOn" timestamp(3),
	"description" text,
	"url" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "VolunteerWork" (
	"id" serial PRIMARY KEY NOT NULL,
	"profileId" integer,
	"cause" text,
	"company" text,
	"companyLinkedinProfileUrl" text,
	"description" text,
	"endsAt" timestamp(3),
	"logoUrl" text,
	"startsAt" timestamp(3),
	"title" text,
	"sharedRawProfileId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_JobCandidates" (
	"A" integer NOT NULL,
	"B" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SensitiveProfileData" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"phone" text,
	"cv" text,
	"notes" text,
	"profileId" integer NOT NULL,
	"userId" text,
	"orgId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SharedRawProfile" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_identifier" text,
	"linkedin_profile_url" text NOT NULL,
	"last_updated" timestamp(3),
	"first_name" text,
	"last_name" text,
	"full_name" text,
	"city" text,
	"state" text,
	"country" text,
	"country_full_name" text,
	"summary" text,
	"profile_pic_url" text,
	"background_cover_image_url" text,
	"headline" text,
	"occupation" text,
	"connections" integer,
	"follower_count" integer,
	"recommendations" text[],
	"skills" text[]
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "CompanyProductCategory" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyId" integer NOT NULL,
	"productId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"percentage" integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CandidateStage_profileId_jobId_key" ON "CandidateStage" ("profileId","jobId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Company_name_key" ON "Company" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Category_name_key" ON "Category" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Client_name_key" ON "Client" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "ProfileOrg_public_identifier_orgId_key" ON "ProfileOrg" ("orgId","public_identifier");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Product_name_key" ON "Product" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Profile_public_identifier_orgId_key" ON "Profile" ("public_identifier","orgId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "_JobCandidates_AB_unique" ON "_JobCandidates" ("A","B");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "_JobCandidates_B_index" ON "_JobCandidates" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SensitiveProfileData_profileId_userId_key" ON "SensitiveProfileData" ("profileId","userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "SharedRawProfile_public_identifier_key" ON "SharedRawProfile" ("public_identifier");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "CompanyProductCategory_companyId_productId_categoryId_key" ON "CompanyProductCategory" ("companyId","productId","categoryId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Activity" ADD CONSTRAINT "Activity_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Article" ADD CONSTRAINT "Article_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Article" ADD CONSTRAINT "Article_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CandidateStage" ADD CONSTRAINT "CandidateStage_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CandidateStage" ADD CONSTRAINT "CandidateStage_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Certification" ADD CONSTRAINT "Certification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Certification" ADD CONSTRAINT "Certification_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Education" ADD CONSTRAINT "Education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Education" ADD CONSTRAINT "Education_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AccomplishmentOrg" ADD CONSTRAINT "AccomplishmentOrg_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AccomplishmentOrg" ADD CONSTRAINT "AccomplishmentOrg_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Course" ADD CONSTRAINT "Course_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Course" ADD CONSTRAINT "Course_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Group" ADD CONSTRAINT "Group_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Group" ADD CONSTRAINT "Group_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HonourAward" ADD CONSTRAINT "HonourAward_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "HonourAward" ADD CONSTRAINT "HonourAward_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Experience" ADD CONSTRAINT "Experience_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Experience" ADD CONSTRAINT "Experience_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."Client"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "JobHistory" ADD CONSTRAINT "JobHistory_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PeopleAlsoViewed" ADD CONSTRAINT "PeopleAlsoViewed_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PeopleAlsoViewed" ADD CONSTRAINT "PeopleAlsoViewed_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ProfileOrg" ADD CONSTRAINT "ProfileOrg_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Language" ADD CONSTRAINT "Language_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Language" ADD CONSTRAINT "Language_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Project" ADD CONSTRAINT "Project_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Profile" ADD CONSTRAINT "Profile_talentPoolId_fkey" FOREIGN KEY ("talentPoolId") REFERENCES "public"."TalentPool"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Patent" ADD CONSTRAINT "Patent_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Patent" ADD CONSTRAINT "Patent_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SimilarProfile" ADD CONSTRAINT "SimilarProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SimilarProfile" ADD CONSTRAINT "SimilarProfile_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TestScore" ADD CONSTRAINT "TestScore_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "TestScore" ADD CONSTRAINT "TestScore_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Publication" ADD CONSTRAINT "Publication_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Publication" ADD CONSTRAINT "Publication_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VolunteerWork" ADD CONSTRAINT "VolunteerWork_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "VolunteerWork" ADD CONSTRAINT "VolunteerWork_sharedRawProfileId_fkey" FOREIGN KEY ("sharedRawProfileId") REFERENCES "public"."SharedRawProfile"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_JobCandidates" ADD CONSTRAINT "_JobCandidates_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Job"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_JobCandidates" ADD CONSTRAINT "_JobCandidates_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Profile"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "SensitiveProfileData" ADD CONSTRAINT "SensitiveProfileData_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CompanyProductCategory" ADD CONSTRAINT "CompanyProductCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CompanyProductCategory" ADD CONSTRAINT "CompanyProductCategory_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "CompanyProductCategory" ADD CONSTRAINT "CompanyProductCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/