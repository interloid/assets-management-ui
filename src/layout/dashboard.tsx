import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Header from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { User } from "@/services/auth.services";
import type { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router";

interface DashboardLayoutProps{
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>,
  currentUser : User;
}
export default function DashboardLayout({setIsAuthenticated, currentUser} : DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div >
        <AppSidebar setIsAuthenticated={setIsAuthenticated} currentUser={currentUser}/>
      </div>
      <SidebarInset className="min-w-0">
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
