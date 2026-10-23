import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Header from "@/components/dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Dispatch, SetStateAction } from "react";
import { Outlet } from "react-router";

export default function DashboardLayout({ setIsAuthenticated }: {setIsAuthenticated: Dispatch<SetStateAction<boolean>>;}) {
  return (
    <SidebarProvider>
      <div >
        <AppSidebar setIsAuthenticated={setIsAuthenticated}/>
      </div>
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
