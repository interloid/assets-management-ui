import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import interloidMark from "@/assets/interloid-mark.svg";
import { useTheme } from "@/context/theme";
import { useLocation } from "react-router";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/assets/": "Assets",
  "/dashboard/assets/new": "Assets",
  "/dashboard/users": "Users",
  "/dashboard/myassets": "MyAssets",
  "/dashboard/profile": "Profile",
};

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] ?? "Dashboard";
  return (
    <header className="border-b sticky lg:hidden! h-14 flex justify-between p-1.5 py-3">
      <div className="flex gap-4 px-2.5">
        <SidebarTrigger>
          <Menu className="size-5 mt-1 transition-transform duration-200 ease-in-out" />
        </SidebarTrigger>
        <div className="size-6 flex gap-2 mt-1">
          <img
            src={interloidMark}
            alt="logo"
            className="size-full object-contain"
          />
          <p className="text-[14px] font-semibold self-center">{pageTitle}</p>
        </div>
      </div>
      <Button
        variant="outline"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        onClick={toggleTheme}
        className="border-none px-3.5"
      >
        {theme === "light" ? (
          <Moon className="size-4.5" />
        ) : (
          <Sun className="size-4.5" />
        )}
      </Button>
    </header>
  );
}
