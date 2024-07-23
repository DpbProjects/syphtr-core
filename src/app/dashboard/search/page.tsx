import { Suspense } from "react";
import {
  fetchSharedProfiles,

  // fetchCompaniesInCategory,
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

  const sharedProfiles = await fetchSharedProfiles(query);
  // const categories = await fetchCompaniesInCategory("CRM");

  const hasParams = Object.keys(query).length !== 0;
  const hasProfiles = sharedProfiles.length !== 0;

  const Loading = () => <div>Loading......</div>;

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-[calc(100vh_-_64px)] w-full gap-3 bg-white">
        <div className="w-full max-w-[1234px] overflow-x-hidden overflow-y-scroll">
          {hasParams && hasProfiles ? (
            sharedProfiles?.map((profile) => {
              return (
                <ProfileCard
                  key={profile.publicIdentifier}
                  profileData={profile}
                />
              );
            })
          ) : (
            <>
              <div className="min-w-[1234px]">No results</div>
              {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
            </>
          )}
        </div>

        <div className="sticky right-0 top-16 flex max-w-[412px] overflow-x-hidden overflow-y-scroll rounded-lg bg-gray-100">
          <ProfileForm />
        </div>
      </div>
    </Suspense>
  );
}
