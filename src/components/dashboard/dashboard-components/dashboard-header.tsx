import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "../../ui/button";
import { SidebarTrigger } from "../../ui/sidebar";
import interloidMark from "@/assets/interloid-mark.svg";
import { useTheme } from "@/context/theme";
import { useLocation } from "react-router";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/assets": "Assets",
  "/assets/new": "Assets",
  "/users": "Users",
  "/my-assets": "My Assets",
  "/profile": "Profile",
};

export function MobilePageHeader() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const pageTitle = location.pathname.startsWith("/assets/asset-details/")
    ? "Assets"
    : (pageTitles[location.pathname] ?? "Dashboard");

  return (
    <header className="border-b sticky lg:hidden h-14 flex justify-between p-1.5 py-3">
      <div className="flex gap-4 px-2.5">
        <SidebarTrigger>
          <Menu className="size-5 mt-1 transition-transform duration-200 ease-in-out" />
        </SidebarTrigger>
        <div className="flex items-center gap-2 mt-1">
          <div className="size-6 shrink-0">
            <img
              src={interloidMark}
              alt="Interloid logo"
              className="size-full object-contain"
            />
          </div>
          <p className="text-[14px] font-semibold">{pageTitle}</p>
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
