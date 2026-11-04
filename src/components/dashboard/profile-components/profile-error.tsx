import { UserRoundX } from "lucide-react";

export function ProfileError() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <div className="grid size-16 place-items-center rounded-full bg-muted">
        <UserRoundX className="size-7 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">We couldn't load your profile</h2>

      <p className="max-w-sm text-sm text-muted-foreground">
        Your profile information is currently unavailable. Please try again in a
        moment.
      </p>
    </div>
  );
}
