import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { logout, type User } from "@/services/auth.services";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import SidebarThemeButton from "./theme-button";
import { getInitials, toCamelCase } from "@/lib/converters";

interface NavUserProps {
  currentUser: User;
  onLogout: () => void;
}

export function NavUser({ currentUser, onLogout }: NavUserProps) {
  const userdata = toCamelCase(currentUser?.data);
  const initials = getInitials(userdata.fullName);
  const navigate = useNavigate();
  async function logOutSession() {
    try {
      const response = await logout();
      if (!response.ok) {
        toast.error("Logout failed!, please try again.");
        return;
      }
      if (response.ok) {
        onLogout();
        navigate("/login");
        toast.success("Logged out Successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <SidebarThemeButton />
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-3 p-1.5 group-data-[collapsible=icon]:flex-col">
            <Avatar className="h-8 w-8 shrink-0 rounded-lg ">
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{userdata.fullName}</span>

              <div className="flex min-w-0 gap-1 items-center text-xs text-muted-foreground">
                <span className="flex gap-1">
                  {userdata.role} <span>·</span>
                </span>
                <span className="truncate">{userdata.email}</span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Log out"
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
              onClick={logOutSession}
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
