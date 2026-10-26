import AssetFilters from "@/components/dashboard/assets-components/asset-filter";
import AssetTable from "@/components/dashboard/assets-components/asset-table";
import StatusTabs from "@/components/dashboard/assets-components/status-bar";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import {
  getAssetsData,
  getListUsers,
  type User,
} from "@/services/assets.services";
import { getAssetStats, type AssetStats } from "@/services/dashboard.services";
import type { Asset, AssetQuery } from "@/types/assets";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Assets() {
  const navigate = useNavigate();
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [assetStats, SetAssetStats] = useState<AssetStats | null>(null);
  const [query, setQuery] = useState<AssetQuery>({
    status: "all",
    search: "",
    type: "all",
    assignedUser: "all",
    warrantyExpiry: "all",
    sort: "created_at:desc",
    page: 1,
    size: 20,
  });
  const debounceSearch = useDebounce(query.search, 500);

  function updateQuery<K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) {
    setQuery((current) => ({
      ...current,
      [key]: value,
      ...(key === "page" ? {} : { page: 1 }),
    }));
  }

  useEffect(() => {
    async function AssetsData() {
      try {
        setIsLoading(true);
        if (query.search !== debounceSearch) {
          return;
        }
        const response = await getAssetsData({
          ...query,
          search: debounceSearch,
        });
        if (!response.success || !response.data) {
          return;
        }
        if (response.success || response.data) {
          setAssetsData(
            response.data.map((item) => ({
              ...item,
              initials:
                item.assignedUser?.fullName
                  ?.split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2) ?? "",
            })),
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    void AssetsData();
  }, [query, debounceSearch]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await getListUsers();
        if (!response.success || !response.data) {
          return;
        }
        if (response.success || response.data) {
          setAllUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    void getUsers();
  }, []);

  useEffect(() => {
    async function assetStats() {
      try {
        const response = await getAssetStats();
        if (!response.success || !response.data) {
          return;
        }
        if (response.success || response.data) {
          SetAssetStats(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    void assetStats();
  }, []);
  return (
    <section className="p-4 md:p-5.5 md:pt-6 lg:p-5.5 lg:pt-7.75! lg:pb-6 lg:pr-7 xl:pt-8.5! xl:pl-8 xl:pr-8 2xl:px-8 gap-5 flex flex-col  lg:justify-between">
      <div className="gap-3.5 flex flex-col w-full xsm:flex-row xsm:justify-between">
        <div className="flex flex-col gap-1 md:gap-1.5">
          <h1 className="text-[22px] md:text-2xl font-semibold tracking-[-0.01em]">
            Assets
          </h1>
          <span className="text-muted-foreground text-[14px]">
            Every laptop, monitor, phone and accessory in the register.
          </span>
        </div>
        <div className="flex gap-1.75 items-end">
          <Button
            onClick={() => navigate("/dashboard/assets")}
            className="px-3.5! py-4.5! pb-4.25! md:px-3.5! md:py-4.5! md:pb-4.5! relative top-0.5 rounded-md gap-2 items-center shadow-xs"
          >
            <Plus className="text-primary-foreground font-normal!" />
            <span className="md:leading-1 relative md:bottom-px">
              Add asset
            </span>
          </Button>
        </div>
      </div>
      <StatusTabs
        assetStats={assetStats}
        status={query.status}
        onQueryChange={updateQuery}
      />
      <AssetFilters
        query={query}
        allUsers={allUsers ?? []}
        onQueryChange={updateQuery}
      />
      <AssetTable
        query={query}
        assetStats={assetStats}
        onQueryChange={updateQuery}
        assets={assetsData ?? []}
        isLoading={isLoading}
      />
    </section>
  );
}
