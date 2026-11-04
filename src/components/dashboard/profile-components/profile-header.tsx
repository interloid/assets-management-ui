import { getInitials } from "@/lib/converters";
import type { ProfileUser } from "./profile-details";

export function ProfileHeader({
  fullName,
  email,
}: Pick<ProfileUser, "fullName" | "email">) {
  return (
    <header className="flex items-center gap-4">
      <span
        aria-hidden="true"
        className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-lg font-semibold text-secondary-foreground"
      >
        {getInitials(fullName)}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <h1 className="text-[clamp(22px,1.2rem+0.6vw,24px)] font-semibold tracking-tight">
          {fullName}
        </h1>

        <p className="break-all text-sm text-muted-foreground">{email}</p>
      </div>
    </header>
  );
}
