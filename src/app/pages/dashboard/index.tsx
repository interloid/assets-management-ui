import { Button } from "@/components/ui/button";
import { List, Plus, SquareOff } from "lucide-react";
import StackedProgressBar from "@/components/dashboard/stacked-progress-bar";
import RecentlyAdded from "@/components/dashboard/recently-added";
import {
  getAssetStats,
  getRecentlyAddedAssets,
  getWarrantyExpiringAssets,
} from "@/services/dashboard.services";
import { useEffect, useState } from "react";
import type {
  ProgressSegment,
  RecentAsset,
  WarrantyAsset,
} from "@/types/dashboard";
import { useNavigate } from "react-router";
import WarrantyExpiringSkeleton from "@/components/dashboard/warranty-expiring-skeleton";
import RecentlyAddedSkeleton from "@/components/dashboard/recently-added-skeleton";
import StackProgressSkeleton from "@/components/dashboard/stacked-progress-bar-skeleton";
import { toast } from "sonner";
import WarrantyExpiring from "@/components/dashboard/warranty-expiring";
import type { AssetType } from "@/types/assets";
import { typeIcons } from "@/components/dashboard/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function mapAssetWithIcon<T extends { type: string }>(asset: T) {
  return {
    ...asset,
    icon: typeIcons[asset.type.toLowerCase() as AssetType] ?? SquareOff,
  };
}

export default function Dashboard() {
  const [segments, setSegments] = useState<ProgressSegment[]>([]);
  const [warrantyAssets, setWarrantyAssets] = useState<WarrantyAsset[]>([]);
  const [recentAssets, setRecentAssets] = useState<RecentAsset[]>([]);
  const [isAssetsLoading, setIsAssetsLoading] = useState(true);
  const [isWarrantyLoading, setIsWarrantyLoading] = useState(true);
  const [isRecentlyAddedLoading, setIsRecentlyAddedLoading] = useState(true);
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    async function loadAssetStats() {
      try {
        const response = await getAssetStats();
        if (!response.success || !response.data) {
          toast.error(response.message);
          return;
        }
        if (response.success || response.data) {
          setSegments([
            {
              label: "In stock",
              count: response.data.inStock,
              color: "bg-emerald-700",
            },
            {
              label: "Assigned",
              count: response.data.assigned,
              color: "bg-blue-700",
            },
            {
              label: "In repair",
              count: response.data.repair,
              color: "bg-amber-700",
            },
            {
              label: "Retired",
              count: response.data.retired,
              color: "bg-neutral-500",
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsAssetsLoading(false);
      }
    }

    async function loadWarrantyAssets() {
      try {
        const response = await getWarrantyExpiringAssets();
        if (!response.success || !response.data) return;
        if (response.success || response.data) {
          setWarrantyAssets(response.data.map(mapAssetWithIcon));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsWarrantyLoading(false);
      }
    }

    async function loadRecentAssets() {
      try {
        const response = await getRecentlyAddedAssets();
        if (!response.success || !response.data) return;
        if (response.success || response.data) {
          setRecentAssets(response.data.map(mapAssetWithIcon));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsRecentlyAddedLoading(false);
      }
    }
    void loadAssetStats();
    void loadWarrantyAssets();
    void loadRecentAssets();
  }, []);
  return (
    <>
      <div className="p-4 md:p-5.5 md:pt-6 lg:p-11.25 lg:pt-7.75 xsm:flex-row xsm:justify-between lg:pb-6 lg:pr-7 xl:pt-8.5 xl:pl-8 2xl:px-8 gap-3.5 xsm:gap-6 flex flex-col xs:flex-row lg:justify-between">
        <div className="flex flex-col gap-1 md:gap-1.5">
          <h1 className="text-[22px] md:text-2xl font-semibold tracking-[-0.01em]">
            Overview
          </h1>
          <span className="text-muted-foreground text-[14px]">
            {currentDate}
          </span>
        </div>
        <div className="flex gap-1.75 items-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => navigate("/assets")}
                className="px-3.5 py-4.25 rounded-md shadow-xs gap-2 relative top-px"
              >
                <List />
                <span className="md:leading-1 relative md:bottom-px">
                  All assets
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" showArrow={false} className="mb-1">
              Open the full asset register
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigate("/assets")}
                className="px-3.5 py-4.5 pb-4.25 md:px-3.5 md:py-4.5 md:pb-4.5 relative top-0.5 rounded-md gap-2 items-center shadow-xs"
              >
                <Plus className="text-primary-foreground font-normal" />
                <span className="md:leading-1 relative md:bottom-px">
                  Add asset
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" showArrow={false} className="mb-1">
              Register a new asset<span className="bg-muted-foreground px-0.5 rounded-xs text-xs">N</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <section className="space-y-6 pt-2.25 pb-2 p-4 md:p-6 md:pt-1 lg:p-10 lg:pl-11.5 lg:pt-0 lg:pr-7 lg:pb-6 gap-6 xl:pl-8 2xl:px-8">
        {isAssetsLoading ? (
          <StackProgressSkeleton />
        ) : (
          <StackedProgressBar segments={segments} />
        )}
      </section>
      <section className="xl:flex w-full gap-6 xl:gap-6 2xl:px-7">
        {isWarrantyLoading ? (
          <WarrantyExpiringSkeleton />
        ) : (
          <WarrantyExpiring assets={warrantyAssets} />
        )}

        {isRecentlyAddedLoading ? (
          <RecentlyAddedSkeleton />
        ) : (
          <RecentlyAdded assets={recentAssets} />
        )}
      </section>
    </>
  );
}
