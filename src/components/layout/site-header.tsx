"use client";

import Link from "next/link";
import Image from "next/image";
import useScrollBackground from "../../hooks/use-scroll-background";
export default function SiteHeader() {
  const showBackground = useScrollBackground();

  return (
    <header
      className={`delay-250 fixed top-0  w-full transition-colors ease-in-out ${showBackground ? "bg-white" : "bg-transparent"}  `}
    >
      <nav className="navbar  mx-auto max-w-screen-xl">
        <div className="flex-1 ">
          <Link href="/" className="flex items-center">
            <Image
              src={"/logos/Black logo - no background.png"}
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
              width={45}
              height={45}
            />
          </Link>
        </div>
        <div className="flex-none ">
          <Link
            href="/dashboard"
            className={`btn btn-outline btn-white hidden border-none text-green-500 hover:bg-white md:flex`}
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className={`btn hidden  border-none bg-green-500 text-black md:flex`}
          >
            Dashboard
          </Link>

          <button className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
