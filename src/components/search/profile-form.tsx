"use client";

import { useEffect, useState } from "react";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formSchema } from "@/utils/schema";

import type { Category } from "@/utils/types";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Input } from "../ui/input";

import { TagInput, type Tag } from "emblor";

const excludedValues = ["Select a country", "Select a category"];

const formCountries = ["United States", "United Kingdom", "Denmark"];

export default function ProfileForm() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/category`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setCategoryData(data);
    };

    void fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      city: "",
      state: "",
      country: "Select a country",
      jobTitle: "",
      softwareCategory: "Select a category",
      companyName: "",
      minExp: "",
      maxExp: "",
      roleDescription: "",
      excludedWords: "",
    },
  });

  const buildParameters = (formValues: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(formValues)) {
      if (value && value && !excludedValues.includes(value)) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    buildParameters(data);
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset(); // Reset form using react-hook-form's reset method
    replace(pathname); // Reset URL parameters
  };

  return (
    <div className="h-full w-full overflow-x-hidden overflow-y-scroll rounded-lg bg-gray-100 p-8 shadow-lg">
      <h2 className="mb-6 text-left text-xl font-bold">Personal details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                {/* <FormDescription>Enter the full name</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="city" {...field} />
                </FormControl>
                {/* <FormDescription>Enter a city</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="state" {...field} />
                </FormControl>
                {/* <FormDescription>Enter a state</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {formCountries.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
          <h2 className="my-6 text-left text-xl font-bold">Experience</h2>
          <FormField
            control={form.control}
            name="softwareCategory"
            render={({ field }) => (
              <>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryData.map((value) => (
                      <SelectItem key={value.id} value={value.name}>
                        {value.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Past job title</FormLabel>
                <FormControl>
                  <Input placeholder="Past job title" {...field} />
                </FormControl>
                {/* <FormDescription>Enter a past job title</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <>
                <FormLabel>Past company name</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Past company name"
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                  />
                </FormControl>
                <FormMessage />
              </>
            )}
          /> */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Past company name</FormLabel>
                <FormControl>
                  <Input placeholder="Past company" {...field} />
                </FormControl>
                {/* <FormDescription>Enter a past job title</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="minExp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min</FormLabel>
                  <FormControl>
                    <Input placeholder="Min years" type="number" {...field} />
                  </FormControl>
                  {/* <FormDescription>Enter a min</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxExp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max</FormLabel>
                  <FormControl>
                    <Input placeholder="Max years" type="number" {...field} />
                  </FormControl>
                  {/* <FormDescription>Enter a max</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="roleDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role description</FormLabel>
                <FormControl>
                  <Input placeholder="Role description" {...field} />
                </FormControl>
                {/* <FormDescription>Search role description</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="excludedWords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excluded words</FormLabel>
                <FormControl>
                  <Input placeholder="Role description" {...field} />
                </FormControl>
                {/* <FormDescription>
                  Exclude Words From Current Company:
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-8 flex flex-row gap-6">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Search
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reset
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
