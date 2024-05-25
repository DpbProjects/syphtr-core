import type { Education, SharedProfile, Experience } from "@/utils/types";

import DrawerToggleButton from "./profile-preview-toggle";

type ProfileCardProps = {
  profileData: {
    SharedRawProfile: SharedProfile;
    Education: Education | null;
    Experience: Experience | null;
  };
  key: SharedProfile["publicIdentifier"];
};

export default function ProfileCard({ profileData, key }: ProfileCardProps) {
  const {
    id,
    fullName,
    country,
    occupation,
    // summary,
    state,
    city,

    // experience,
  } = profileData.SharedRawProfile;

  return (
    <div
      key={key}
      className="mb-3 flex h-[214px] w-full overflow-hidden rounded-lg bg-white"
    >
      <div className="max-w-max px-6 py-4">
        <div className=" h-28 w-28 rounded-full bg-gray-400" />
        {/* {profilePicUrl && (
          <Image
            src={profilePicUrl}
            className=" h-28 w-28 rounded-full bg-gray-400"
            alt=""
          />
        )} */}
      </div>
      <div className="flex-1 px-6 py-4">
        <p className=" mb-2 text-2xl font-bold">{fullName}</p>
        <p className="mb-2">{occupation}</p>
        <p className="mb-2">
          {city} | {state} | {country}
        </p>
        {/* <p className=" text-sm text-gray-500">{summary}</p> */}
      </div>
      <div className="max-w-[325px] rounded-r-lg bg-gray-200 px-6 py-4">
        <p className=" mb-2 text-2xl font-bold">Score</p>

        <DrawerToggleButton id={id} />
      </div>
    </div>
  );
}
