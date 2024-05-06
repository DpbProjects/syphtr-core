export interface Experience {
  id: number;
  profileId: number | null;
  company: string | null;
  title: string | null;
  description: string | null;
  location: string | null;
  startsAt: string | null;
  endsAt: string | null;
  companyLinkedinProfileUrl: string | null;
  logoUrl: string | null;
  sharedRawProfileId: number | null; // Adjust type as per your requirement
}

export interface Education {
  id: number;
  profileId: number | null;
  school: string | null;
  degreeName: string | null;
  fieldOfStudy: string | null;
  startsAt: string | null;
  endsAt: string | null;
  description: string | null;
  activitiesAndSocieties: string | null;
  grade: string | null;
  logoUrl: string | null;
  schoolLinkedinProfileUrl: string | null;
  sharedRawProfileId: number | null; // Adjust type as per your requirement
}

export interface Profile {
  id: number;
  publicIdentifier: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  countryFullName: string | null;
  summary: string | null;
  profilePicUrl: string | null;
  backgroundCoverImageUrl: string | null;
  headline: string | null;
  occupation: string | null;
  connections: number | null;
  followerCount: number | null;
  recommendations: string[] | null;
  skills: string[] | null;
  lastUpdated: string | null;
  linkedinProfileUrl: string | null;
  talentPoolId: number | null;
  orgId: string | null;
  userId: string | null;
  experience: Experience[];
  education: Education[];
}
