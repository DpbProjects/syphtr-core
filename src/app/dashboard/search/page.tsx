import { Suspense } from "react";
import {
  fetchSharedProfiles,
  fetchSharedProfilesPages,
  fetchSharedProfileCount,
} from "@/utils/data";

import ProfileCard from "@/components/search/profile-card";
import ProfileForm from "@/components/search/profile-form";
import type { FormValues } from "@/utils/types";

export default async function Page({
  searchParams,
}: {
  searchParams: FormValues;
}) {
  const query = searchParams ?? {};
  // const currentPage = Number(searchParams?.page) || 1;

  const sharedProfiles = await fetchSharedProfiles(query);

  const sharedProfileCount = await fetchSharedProfileCount();

  const hasParams = Object.keys(query).length !== 0;
  const hasProfiles = sharedProfiles.length !== 0;

  console.log(sharedProfiles);

  const Loading = () => <div>Loading......</div>;

  return (
    <main className=" bg-white ">
      <Suspense fallback={<Loading />}>
        <div className="flex gap-3">
          <div className=" min-w-[712px]">
            {hasParams && hasProfiles ? (
              sharedProfiles?.map((profile) => {
                const { SharedRawProfile, Education, Experience } = profile;
                return (
                  <ProfileCard
                    key={profile.SharedRawProfile.publicIdentifier}
                    profileData={{
                      SharedRawProfile,
                      Education,
                      Experience,
                    }}
                  />
                );
              })
            ) : (
              <div>No results</div>
            )}
          </div>
          <div className="sticky top-16 flex h-screen min-h-screen w-full overflow-y-auto overflow-x-hidden rounded-lg bg-gray-100">
            <ProfileForm />
          </div>
        </div>
      </Suspense>
    </main>
  );
}
