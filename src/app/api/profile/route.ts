import { type NextRequest, NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { profile } from "@/server/db/schema";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  console.log(query);

  const response = await db.query.profile.findMany({
    where: eq(profile.id, Number(query)),
    limit: 8,
    with: {
      experience: true,
      education: true,
    },
  });

  return NextResponse.json(response);
}
