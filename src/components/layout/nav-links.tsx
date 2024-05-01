"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  HomeIcon,
  // WrenchIcon,
  MagnifyingGlassCircleIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Overview", href: "/dashboard", icon: HomeIcon },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: MagnifyingGlassCircleIcon,
  },
  { name: "Jobs", href: "/dashboard/jobs", icon: ClipboardDocumentCheckIcon },
  // { name: "Admin", href: "/dashboard/admin", icon: WrenchIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                "bg-green-100 text-green-600": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
