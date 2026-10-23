import { Menu, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import interloidMark from "@/assets/interloid-mark.svg";

export default function Header() {
  return (
    <header className="border-b sticky lg:hidden! h-14 flex justify-between p-1.5 py-3">
      <div className="flex gap-4 px-2.5">
        <SidebarTrigger>
          <Menu className="size-5 mt-1 transition-transform duration-200 ease-in-out" />
        </SidebarTrigger>
        <div className="size-6 flex gap-2 mt-1">
          <img
            src={interloidMark}
            alt="logo"
            className="size-full object-contain"
          />
          <span className="text-[14px] font-semibold self-center">
            Dashboard
          </span>
        </div>
      </div>
      <Button variant="outline" className="border-none px-3.5">
        <Moon className="size-4.5 ml-1" />
      </Button>
    </header>
  );
}
