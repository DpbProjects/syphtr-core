import { type NextRequest, NextResponse } from "next/server";

import { db } from "@/server/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  console.log(query);

  const response = await db.query.category.findMany();

  return NextResponse.json(response);
}
