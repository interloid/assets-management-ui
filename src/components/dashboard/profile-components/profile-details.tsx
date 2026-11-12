import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/converters";
import { CopyButton } from "../assets-components/copy-button";

export interface ProfileUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: boolean;
  createdAt: string;
}

export interface ProfileDetailsProps {
  user: ProfileUser;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const status = user.status === true ? "Active" : "Inactive";
  const details = [
    { label: "Full name", value: user.fullName },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    { label: "Status", value: status, isStatus: true },
    { label: "Member since", value: formatDate(user.createdAt) },
    { label: "User ID", value: user.id, isCopy:true },
  ];
  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm xl:w-[63.5%] xl:max-h-96 2xl:w-[50%] 2xl:max-h-93">
      <div className="border-b px-5 py-4">
        <h2 className="text-base font-semibold">Account</h2>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Name, email and role are managed by IT.
        </p>
      </div>
      <dl className="px-5 md:py-1">
        {details.map((detail, index) => (
          <div
            key={detail.label}
            className={cn(
              "grid grid-cols-[minmax(110px,110px)_minmax(0,1fr)] xs:grid-cols-[minmax(110px,180px)_minmax(0,1fr)]",
              "gap-x-4 gap-y-1 py-3 text-sm",
              index !== 0 && "border-t",
            )}
          >
            <dt className="text-muted-foreground">{detail.label}</dt>
            <dd
              className={cn(
                "min-w-0 wrap-break-word xl:break-all",
                detail.isStatus &&
                  (status === "Active"
                    ? "text-success"
                    : "text-muted-foreground"),
              detail.isCopy ? "text-muted-foreground" : "text-foreground")}
            >
              {detail.isCopy ? (
                <div className="flex items-center">
                  <span className="wrap-break-word">{detail.value}</span>
                  <CopyButton value={detail.value} />
                </div>
              ) : (
               <span>{detail.value}</span> 
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
