"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "@/utils/schema";

export default function ProfileForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      city: "",
      state: "",
      country: "",
      pastJobTitle: "",
      pastJobCompanyName: "",
    },
  });

  const buildParameters = (formValues: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(formValues)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    buildParameters(data);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset(); // Reset form using react-hook-form's reset method
    replace(pathname); // Reset URL parameters
  };

  return (
    <div className="h-full w-full max-w-md overflow-x-hidden overflow-y-scroll rounded-lg bg-gray-100 p-8 shadow-lg">
      <h2 className="mb-6 text-left text-xl font-bold">Personal details</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            {...register("city")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            {...register("state")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            {...register("country")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <h2 className="mb-6 text-left text-xl font-bold">
          Previous experience
        </h2>
        <div>
          <label
            htmlFor="pastJobTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Past job title
          </label>
          <input
            type="text"
            id="pastJobTitle"
            {...register("pastJobTitle")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="pastJobCompanyName"
            className="block text-sm font-medium text-gray-700"
          >
            Past company name
          </label>
          <input
            type="text"
            id="pastJobCompanyName"
            {...register("pastJobCompanyName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>
        </div>
        <div>
          <button
            type="reset"
            onClick={handleReset}
            className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
