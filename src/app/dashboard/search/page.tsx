import { Suspense } from "react";
import { fetchProfiles } from "@/utils/data";
import ProfileCard from "@/components/profile-card";
import Search from "@/components/search";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query ?? "";
  const profiles = await fetchProfiles(query);

  const Loading = () => <div>Loading......</div>;

  return (
    <main className=" bg-gray-50">
      <h1 className=" mb-4 text-3xl font-bold">Search Page</h1>
      <Search placeholder="Search by name..." />
      <div className="grid grid-cols-1 gap-3">
        <Suspense fallback={<Loading />}>
          {query ? (
            profiles?.map((profile) => (
              <ProfileCard
                key={profile.publicIdentifier}
                profileData={profile}
              />
            ))
          ) : (
            <div>No results</div>
          )}
        </Suspense>
      </div>
    </main>
  );
}
