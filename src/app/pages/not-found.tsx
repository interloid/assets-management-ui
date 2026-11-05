import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Sorry, that page could not be found.</p>
      <Link
        to="/dashboard"
        className="border rounded-md p-2 cursor-pointer hover:bg-primary/80 shadow-sm bg-primary text-primary-foreground  duration-150 ease-in-out"
      >
        Go to dashboard
      </Link>
    </main>
  );
}
