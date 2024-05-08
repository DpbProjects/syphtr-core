import { Suspense } from "react";

import Search from "@/components/search";
import JobsTable from "@/components/jobs/table";
import CreateModel from "@/components/jobs/model";
import CreateForm from "@/components/jobs/forms/create-form";

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
        <CreateModel content={<CreateForm />} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Suspense fallback={<Loading />}>
          <JobsTable query={""} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
