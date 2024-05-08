"use client";

import Link from "next/link";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteJob } from "@/utils/actions";

export function ViewJob({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/jobs/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EyeIcon className="w-5" />
    </Link>
  );
}

export function EditJob({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/jobs/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteJob({ id }: { id: number }) {
  return (
    <button
      onClick={() => deleteJob(id)}
      className="rounded-md border p-2 text-red-700 hover:bg-gray-100"
    >
      <TrashIcon className="w-5" />
    </button>
  );
}
