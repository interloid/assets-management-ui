import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./sidebar-header";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Boxes,
  Users,
  Package,
  UserRound,
} from "lucide-react";
import { NavUser } from "./nav-user";
import { Link, useLocation } from "react-router";
import interloidMark from "@/assets/interloid-mark.svg";
import { useSidebar } from "@/components/ui/sidebar-context";

export type NavMainItem = {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
};
export type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  navMain: NavMainItem[];
};

const data: SidebarData = {
  user: {
    name: "kavin",
    email: "kavi@example.com",
    avatar: interloidMark,
    role: "Admin",
  },
  navMain: [
    {
      title: "Manage",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/dashboard",
        },
        {
          title: "Assets",
          icon: Boxes,
          url: "/assets",
        },
        {
          title: "Users",
          icon: Users,
          url: "/users",
        },
      ],
    },
    {
      title: "You",
      items: [
        {
          title: "My assets",
          icon: Package,
          url: "/my-assets",
        },
        {
          title: "Profile",
          icon: UserRound,
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & {}) {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="group-data-[collapsible=icon]:w-16 w-64"
    >
      <SidebarHeader className="group-data-[collapsible=icon]:px-4.5 group-data-[collapsible=icon]:py-3.5 pt-1.5">
        <AppSidebarHeader />
      </SidebarHeader>
      <div className="hidden justify-center group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-3 group-data-[collapsible=icon]:mt-1">
        <SidebarSeparator className="h-px w-6" />
      </div>
      <SidebarContent className="group-data-[collapsible=icon]:px-2 px-1 gap-1.25 ">
        {data.navMain.map((item) => (
          <React.Fragment key={item.title}>
            <SidebarGroup className="pt-0 group-data-[collapsible=icon]:pb-4">
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5 group-data-[collapsible=icon]:gap-1.5">
                  {item.items.map((navItem) => (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={
                          pathname === navItem.url ||
                          (navItem.url !== "/dashboard" &&
                            pathname.startsWith(`${navItem.url}/`))
                        }
                        tooltip={navItem.title}
                        className="data-active:bg-transparent flex gap-2.5 h-9  data-[active=true]:bg-muted hover:bg-muted"
                      >
                        <Link
                          to={navItem.url}
                          onClick={() => {
                            if (isMobile) {
                              setOpenMobile(false);
                            }
                          }}
                        >
                          {navItem.icon && (
                            <navItem.icon className="text-muted-foreground group-data-[active=true]/menu-button:text-sidebar-primary" />
                          )}
                          <span>{navItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="hidden justify-center group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-3 group-data-[collapsible=icon]:pb-1">
              <SidebarSeparator className="h-px w-6 " />
            </div>
          </React.Fragment>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
