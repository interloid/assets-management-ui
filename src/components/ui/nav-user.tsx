"use client";

import { Dot, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { logOut } from "@/services/auth.services";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function NavUser({
  user,
  onLogout,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  onLogout: () => void;
}) {
  const navigate = useNavigate();
  async function logOutSession() {
    try {
      const response = await logOut();
        console.log(response.ok, "response");
 
      if(!response.ok){
        toast.error("Logout failed!, please try again.")
        return ;
      }
      if(response.ok) {
        onLogout()
        navigate("/login");
        toast.success("logged out Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  }
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-3 p-0 group-data-[collapsible=icon]:flex-col">
            <Avatar className="h-8 w-8 shrink-0 rounded-lg ">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">KK</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{user.name}</span>

              <div className="flex min-w-0 items-center text-xs text-muted-foreground">
                <span>{user.role}</span>
                <Dot />
                <span className="truncate">{user.email}</span>
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
    );
  }
