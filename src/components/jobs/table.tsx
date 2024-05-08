import { formatCurrency } from "@/utils/helpers";
import { fetchFilteredJobs, fetchJobs } from "@/utils/data";

import { ViewJob, EditJob, DeleteJob } from "./buttons";

export default async function JobsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const jobs = await fetchFilteredJobs(query, currentPage);

  const allJobs = await fetchJobs();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {jobs?.map((job) => (
              <div key={job.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={job.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{job.title}</p>
                    </div>
                    <p className="text-sm text-gray-500">{job.department}</p>
                  </div>
                  {/* <InvoiceStatus status={job.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(Number(job.salary))}
                    </p>
                    {/* <p>{formatDateToLocal(invoice.date)}</p> */}
                  </div>
                  {/* <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Hiring team
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Department
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Business unit
                </th>

                <th scope="col" className="px-3 py-5 font-medium">
                  Salary
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Candidates
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {allJobs?.map((job) => (
                <tr
                  key={job.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {job.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {job.hiringTeam}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {job.department}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {job.businessUnit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(Number(job.salary))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {job.jobCandidates.length}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewJob id={Number(job.id)} />
                      <EditJob id={Number(job.id)} />
                      <DeleteJob id={Number(job.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
