import { Suspense } from "react";
import Link from "next/link";

import Search from "@/components/search";
import JobsTable from "@/components/jobs/jobs-table";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  // const jobs = await fetchFilteredJobs(searchParams?.query, searchParams?.page);
  // const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const Loading = () => <div>Loading......</div>;

  return (
    <main className=" bg-gray-50">
      <h1 className=" mb-4 text-3xl font-bold">Jobs Page</h1>
      <div className="flex justify-between">
        <Search placeholder="Search by name..." />
        <Link
          className="flex h-10 items-center rounded-lg bg-green-500 px-4 text-sm font-medium text-white transition-colors hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          href={"/dashboard/jobs/create"}
        >
          Create job
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Suspense fallback={<Loading />}>
          <JobsTable query={""} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
