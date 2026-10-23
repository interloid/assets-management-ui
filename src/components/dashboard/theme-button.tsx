import { cn } from "cn";
import { Moon, Sun } from "lucide-react";
import { useSidebar } from "../ui/sidebar-context";
import { useTheme } from "@/context/theme";

export default function SidebarThemeButton() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-0.5 border-b border-sidebar-border px-0 py-2">
      <button
        type="button"
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        onClick={toggleTheme}
        className={cn(
          "flex h-9 items-center justify-start gap-2.5 rounded-md border-0 bg-transparent px-3 text-left text-sm transition-colors duration-150 hover:bg-sidebar-accent",
          collapsed ? "justify-center px-0" : "justify-start gap-2.5 px-3",
        )}
      >
        {theme === "light" ? (
          <Moon
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground"
          />
        ) : (
          <Sun
            aria-hidden="true"
            className="size-4 shrink-0 text-muted-foreground"
          />
        )}

        {!collapsed && (
          <span className="whitespace-nowrap">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </span>
        )}
      </button>
    </div>
  );
}
