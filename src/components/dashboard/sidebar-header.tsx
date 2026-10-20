import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../ui/sidebar";
import { useSidebar } from "../ui/sidebar-context";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="relative flex flex-col">
            <SidebarMenuButton
              size="lg"
              className=" data-[state=open]:text-sidebar-accent-foreground bg-transparent!"
            >
              <div className="flex size-7 shrink-0 items-center justify-center">
                <img
                  src="/src/assets/interloid-mark.svg"
                  alt="Interloid logo"
                  className="size-full object-contain"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-[1.15] pl-0.5 whitespace-nowrap group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">Interloid</span>
                <span className="truncate text-xs text-muted-foreground font-normal">
                  Asset Register
                </span>
              </div>
            </SidebarMenuButton>
            <SidebarTrigger
              className="absolute right-1 top-3.75 h-5! w-10! items-baseline size-1.5 font-extralight text-muted-foreground cursor-pointer group-data-[collapsible=icon]:static group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:mt-5.75 group-data-[collapsible=icon]:translate-y-0 group-data-[collapsible=icon]:justify-start group-data-[collapsible=icon]:pl-1.25"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelRightOpen className="size-4" />
              ) : (
                <PanelLeftOpen className="size-4" />
              )}
            </SidebarTrigger>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
