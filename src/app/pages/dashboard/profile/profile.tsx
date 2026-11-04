import ProfileDetails from "@/components/dashboard/profile-components/profile-details";
import { ProfileError } from "@/components/dashboard/profile-components/profile-error";
import { ProfileHeader } from "@/components/dashboard/profile-components/profile-header";
import { ProfilePageSkeleton } from "@/components/dashboard/profile-components/profile-page-skeleton";
import SecuritySettings from "@/components/dashboard/profile-components/security-settings";
import { getCurrentSession } from "@/services/auth-services";
import { useEffect, useState } from "react";

export type ProfileDetails = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  updatedAt: string;
  createdAt: string;
  status: boolean;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getProfile() {
      setIsLoading(true);
      try {
        const response = await getCurrentSession();
        console.log("response", response);
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void getProfile();
  }, []);
  if (isLoading) {
    return <ProfilePageSkeleton />;
  }

  if (!profile) {
    return <ProfileError />;
  }

  const fullName = profile?.fullName;
  const email = profile?.email;

  return (
    <main className="flex justify-center">
      <section className="p-4 md:p-6 lg:p-8 flex flex-col w-full gap-6 xl:max-w-400 xl:justify-center">
        <div>
          <ProfileHeader fullName={fullName} email={email} />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row xl:w-full">
          <ProfileDetails user={profile} />
          <SecuritySettings />
        </div>
      </section>
    </main>
  );
}
