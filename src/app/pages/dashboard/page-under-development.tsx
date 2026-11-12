import { Link } from "react-router";

interface PageUnderDevelopmentProps {
  title: string;
}

export default function PageUnderDevelopment({
  title,
}: PageUnderDevelopmentProps) {
  return (
    <div className="h-full w-full flex items-center justify-center flex-col gap-3">
      <h1>{title} page is now under development</h1>
      <Link
        to="/dashboard"
        className="rounded-md bg-primary p-2 text-background"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
