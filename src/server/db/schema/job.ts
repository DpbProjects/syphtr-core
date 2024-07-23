import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";

import { client } from "./client";

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
