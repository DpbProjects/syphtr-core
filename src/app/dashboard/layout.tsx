import SideNav from "@/components/layout/sidenav";
import { SideDrawerProvider } from "@/context/side-draw-context";

import ProfilePreview from "@/components/search/profile-preview";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideDrawerProvider>
      <ProfilePreview />
      <div className="flex h-screen w-full">
        <SideNav>{children}</SideNav>
      </div>
    </SideDrawerProvider>
  );
}
