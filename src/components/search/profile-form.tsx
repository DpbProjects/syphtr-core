"use client";

import { useRef, type FormEvent } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import type { FormValues } from "@/utils/types";

export default function ProfileForm() {
  const formRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  const buildParameters = (formValues: FormValues) => {
    const params = new URLSearchParams(searchParams);

    for (const value in formValues) {
      if (formValues[value as keyof FormValues] !== "") {
        params.set(value, formValues[value as keyof FormValues]);
      } else {
        params.delete(value);
      }
    }

    // params.set("query", formValues["firstName"]);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formValues = {
      fullName: formData.get("fullName") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      country: formData.get("country") as string,
    };

    buildParameters(formValues);
  };

  return (
    <div className="h-full w-full max-w-md rounded-lg bg-gray-100 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Search for profiles
      </h2>
      <form ref={formRef} className="space-y-4 " onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="state"
            id="state"
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
            name="country"
            id="country"
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
      </form>
    </div>
  );
}