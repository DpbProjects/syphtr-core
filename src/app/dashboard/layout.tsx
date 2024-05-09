import SideNav from "@/components/layout/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <SideNav>{children}</SideNav>
    </div>
  );
}
