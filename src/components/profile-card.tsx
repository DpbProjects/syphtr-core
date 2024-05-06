// import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/utils/types";

type ProfileCardProps = {
  profileData: Profile;
  key: Profile["publicIdentifier"];
};

export default function ProfileCard({ profileData, key }: ProfileCardProps) {
  const {
    id,
    fullName,
    country,
    occupation,
    summary,
    // profilePicUrl,
    state,
    city,
  } = profileData;

  return (
    <div key={key} className="flex min-h-[414px]  rounded-lg bg-white">
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
        <p className=" text-sm text-gray-500">{summary}</p>
      </div>
      <div className="min-w-[325px] rounded-r-lg bg-gray-200 px-6 py-4">
        <p className=" mb-2 text-2xl font-bold">Score</p>

        <Link href={`search/${id}`}>View profile</Link>
      </div>
    </div>
  );
}
