import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";

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
