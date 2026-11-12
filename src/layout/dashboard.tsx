import { AppSidebar } from "@/components/app-sidebar";
import { MobilePageHeader } from "@/components/dashboard/mobile-page-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div>
        <AppSidebar />
      </div>
      <SidebarInset>
        <MobilePageHeader />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
