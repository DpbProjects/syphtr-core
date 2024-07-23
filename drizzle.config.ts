import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema/*",
  out: "./src/server/db/",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  // tablesFilter: ["syphtr-core_*"],
} satisfies Config;
