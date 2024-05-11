"use client";

import { useState, type ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import { RocketIcon, User, Cable, Book, Users } from "lucide-react";

type SideNavProps = {
  children: ReactNode;
};

import { Sidebar, useSidebar, Overlay, Button } from "@rewind-ui/core";

export default function SideNav({ children }: SideNavProps) {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  return (
    <div className="relative flex min-h-full w-full flex-row">
      <Sidebar
        onToggle={(state) => {
          setExpanded(state.expanded);
          setMobile(state.mobile);
        }}
        className="fixed"
        color="white"
        shadow="xl"
      >
        <Sidebar.Head>
          <Sidebar.Head.Logo>
            <Image src="/site-icon.png" width={28} height={28} alt="Rewind-UI" />
          </Sidebar.Head.Logo>
          <Sidebar.Head.Title>Syphtr</Sidebar.Head.Title>
          {/* <Sidebar.Head.Toggle /> */}
        </Sidebar.Head>

        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<RocketIcon />}
              label="Dashboard"
              href="#"
              active
            />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Search</Sidebar.Nav.Section.Title>
            <Link href="/dashboard/search">
              <Sidebar.Nav.Section.Item
                icon={<User />}
                label="Find profiles"
                as={"div"}
              />
            </Link>

            <Sidebar.Nav.Section.Item
              icon={<Cable />}
              label="Pipeline Database"
              href="#"
            />
          </Sidebar.Nav.Section>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Title>Management</Sidebar.Nav.Section.Title>
            <Sidebar.Nav.Section.Item
              icon={<Book />}
              label="Jobs"
              href="jobs"
            />
            <Sidebar.Nav.Section.Item icon={<Users />} label="Team" href="#" />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>

        <Sidebar.Footer>
          <div className="flex flex-col items-center justify-center text-sm">
            <span className="font-semibold">Rewind-UI</span>
            <span>version x.y.z</span>
          </div>
        </Sidebar.Footer>
      </Sidebar>

      <main
        className={`flex w-full transform flex-col items-center text-slate-700 transition-all duration-100 ${
          expanded ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {mobile && (
          <Overlay
            blur="none"
            onClick={() => {
              sidebar.toggleMobile();
            }}
            className="z-40 md:hidden"
          />
        )}
        <header className="sticky top-0 flex min-h-[4rem] w-full flex-row items-center border-b border-b-gray-100 bg-white px-8 shadow-sm">
          <span>Navbar</span>

          <Button
            onClick={() => {
              sidebar.toggleMobile();
            }}
            size="sm"
            color="white"
            icon
            className="ml-auto flex md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M448 96c0-17.7-14.3-32-32-32H32C14.3 64 0 78.3 0 96s14.3 32 32 32H416c17.7 0 32-14.3 32-32zm0 320c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z" />
              <path
                className="opacity-50"
                d="M0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"
              />
            </svg>
          </Button>
        </header>

        <div className="h-full w-full p-8">{children}</div>

        {/* <div className="flex sticky bottom-0 items-center bg-white w-full min-h-[4rem] px-8">
          <span>Footer</span>
        </div> */}
      </main>
    </div>
  );
}
