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
  };
  navMain: NavMainItem[];
};

const data: SidebarData = {
  user: {
    name: "kavin",
    email: "kavi@example.com",
    avatar: "src/assets/interloid-mark.svg",
  },
  navMain: [
    {
      title: "Manage",
      items: [
        {
          title: "Dashboard",
          icon: LayoutDashboard,
          url: "/dashboard",
          isActive: true,
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
          url: "#",
        },
        {
          title: "Profile",
          icon: UserRound,
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="group-data-[collapsible=icon]:w-16 w-64"
    >
      <SidebarHeader className="group-data-[collapsible=icon]:px-4.5 group-data-[collapsible=icon]:py-3.5 pt-1.5">
        <AppSidebarHeader />
      </SidebarHeader>
      <div className="flex justify-center px-0 pt-2 group-data-[collapsible=icon]:pt-2 group-data-[collapsible=icon]:h-3">
        <SidebarSeparator className="hidden h-px group-data-[collapsible=icon]:block group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:mx-auto" />
      </div>
      <SidebarContent className="px-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => (
                  <SidebarMenuItem key={navItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={navItem.isActive}
                      tooltip={navItem.title}
                      className="bg-transparent!"
                    >
                      <a href={navItem.url}>
                        {navItem.icon && (
                          <navItem.icon className="text-muted-foreground" />
                        )}
                        <span>{navItem.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
