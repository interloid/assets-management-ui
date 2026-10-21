"use client";

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
import { NavUser } from "../ui/nav-user";
import { Link, useLocation } from "react-router";
import interloidMark from "@/assets/interloid-mark.svg";

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
          url: "/dashboard/assets",
        },
        {
          title: "Users",
          icon: Users,
          url: "/dashboard/users",
        },
      ],
    },
    {
      title: "You",
      items: [
        {
          title: "My assets",
          icon: Package,
          url: "/dashboard/myassets",
        },
        {
          title: "Profile",
          icon: UserRound,
          url: "/dashboard/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
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
      <SidebarContent className="group-data-[collapsible=icon]:px-2 px-1">
        {data.navMain.map((item) => (
          <>
            <SidebarGroup key={item.title} className="pt-0">
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-2">
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
                        className="bg-transparent! h-9  data-[active=true]:bg-muted! hover:bg-muted!"
                      >
                        <Link to={navItem.url}>
                          {navItem.icon && (
                            <navItem.icon className="text-muted-foreground group-data-[active=true]/menu-button:text-sidebar-primary!" />
                          )}
                          <span>{navItem.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="hidden justify-center group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-3">
              <SidebarSeparator className="h-px w-6" />
            </div>
          </>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
