import { Button } from "@/components/ui/button";
import { Keyboard, Laptop, List, Monitor, Plus } from "lucide-react";
import StackedProgressBar from "@/components/dashboard/stackedprogressbar";
import WarrantyExpiring from "@/components/dashboard/warrantyExpiring";
import RecentlyAdded from "@/components/dashboard/recentlyadded";

const assetStatuses = [
  { label: "In stock", count: 8, color: "bg-emerald-700" },
  { label: "Assigned", count: 10, color: "bg-blue-700" },
  { label: "In repair", count: 3, color: "bg-amber-700" },
  { label: "Retired", count: 3, color: "bg-neutral-500" },
];

const warrantyAssets = [
  {
    id: "asset-1",
    assetCode: "IL-LAP-0045",
    assignedTo: "Unassigned",
    daysRemaining: 10,
    icon: Laptop,
  },
  {
    id: "asset-2",
    assetCode: "IL-LAP-0044",
    assignedTo: "Ananya Iyer",
    daysRemaining: 13,
    icon: Laptop,
  },
  {
    id: "asset-3",
    assetCode: "IL-LAP-0043",
    assignedTo: "Unassigned",
    daysRemaining: 39,
    icon: Laptop,
  },
  {
    id: "asset-4",
    assetCode: "IL-MON-0016",
    assignedTo: "Unassigned",
    daysRemaining: 42,
    icon: Monitor,
  },
  {
    id: "asset-5",
    assetCode: "IL-MON-0015",
    assignedTo: "Unassigned",
    daysRemaining: 42,
    icon: Monitor,
  },
  {
    id: "asset-4",
    assetCode: "IL-ACC-0067",
    assignedTo: "Unassigned",
    daysRemaining: 42,
    icon: Keyboard,
  },
];

const recentAssets = [
  {
    id: "asset-1",
    assetCode: "IL-LAP-0047",
    name: "Dell Latitude 7450, 32 GB / 1 TB",
    status: "In stock" as const,
    icon: Laptop,
  },
  {
    id: "asset-2",
    assetCode: "IL-ACC-0070",
    name: "CalDigit TS4 Thunderbolt dock",
    status: "In stock" as const,
    icon: Keyboard,
  },
  {
    id: "asset-3",
    assetCode: "IL-ACC-0065",
    name: "Logitech MX Keys keyboard",
    status: "Assigned" as const,
    icon: Keyboard,
  },
  {
    id: "asset-4",
    assetCode: "IL-LAP-0048",
    name: 'MacBook Air 13" M3, 16 GB / 512 GB',
    status: "Assigned" as const,
    icon: Laptop,
  },
];

export default function Dashboard() {
  return (
    <>
      <section className="p-4 md:p-5.5 md:pt-6 lg:p-11.25 lg:pt-7.75! lg:pb-6 lg:pr-7 xl:pt-8.5! xl:pl-8 2xl:px-8 gap-6 flex flex-col xs:flex-row lg:justify-between">
        <div className="gap-4 flex flex-col w-full xsm:flex-row xsm:justify-between">
          <div className="flex flex-col gap-1 md:gap-1.5">
            <h1 className="text-[22px] md:text-2xl font-semibold tracking-[-0.01em]">
              Overview
            </h1>
            <span className="text-muted-foreground text-[14px]">
              Tuesday, 20 October 2026
            </span>
          </div>
          <div className="flex gap-1.75 items-end">
            <Button
              variant="outline"
              className="px-3.5! py-4.25! rounded-md shadow-xs gap-2 relative top-px"
            >
              <List />
              <span className="md:leading-1 relative md:bottom-px">
                All assets
              </span>
            </Button>
            <Button className="px-3.5! py-4.5! pb-4.25! md:px-3.5! md:py-4.5! md:pb-4.5! relative top-0.5 rounded-md gap-2 items-center shadow-xs">
              <Plus className="text-primary-foreground font-normal!" />
              <span className="md:leading-1 relative md:bottom-px">
                Add asset
              </span>
            </Button>
          </div>
        </div>
      </section>
      <div className="space-y-6 pt-1.75 p-4 md:p-6 md:pt-1 lg:p-10 lg:pl-11.5 lg:pt-0 lg:pr-7 lg:pb-6 gap-6 xl:pl-8 2xl:px-8">
        <StackedProgressBar segments={assetStatuses} />
      </div>
      <div className="xl:flex w-full gap-6 xl:gap-6 2xl:px-7 ">
        <div className="p-4 md:p-6 md:pt-0 lg:p-10 lg:pl-11.5 lg:pt-0 lg:pr-7 lg:pb-6.5 border-none xl:w-1/2 xl:py-0 xl:pr-0 xl:pl-8 2xl:pl-1">
          <WarrantyExpiring assets={warrantyAssets} />
        </div>
        <div className="p-4 md:p-6 md:pt-0 lg:p-10 lg:pl-11.5 lg:pt-0 lg:pr-7 xl:w-1/2 xl:pr-7 2xl:pr-1 py-0 xl:p-0 border-none">
          <RecentlyAdded assets={recentAssets} />
        </div>
      </div>
    </>
  );
}
