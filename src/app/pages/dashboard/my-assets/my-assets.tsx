import MyAssetList from "@/components/dashboard/my-assets-components/my-asset-list";
import type { AssetListResponse } from "@/services/dashboard-services";
import { getMyAssets } from "@/services/my-assets-services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AssetItem = NonNullable<AssetListResponse["data"]>[number];

export default function MyAssetsPage() {
  const [myAssets, setMyAssets] = useState<AssetItem[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleMyAssets() {
      setIsLoading(true);
      try {
        const response = await getMyAssets();
        console.log("response", response);
        if (response.success || response.data) {
          setMyAssets(response.data ?? []);
          setTotalAssets(
            response.paginationMeta?.totalItems ?? response.data?.length ?? 0,
          );
          console.log("totalAssets", totalAssets);
        }
        if (!response.success || !response.data) {
          if (response.errors && response.errors !== null) {
            const errorMessage = response.errors
              .map((error) => error.message)
              .join(", ");
            setError(errorMessage);
            toast.error(errorMessage);
          } else {
            setError(response.message);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void handleMyAssets();
  }, [totalAssets]);

  if (error) {
    return (
      <section
        role="alert"
        className="p-6 text-center h-full flex flex-col justify-center items-center"
      >
        <h2 className="font-semibold">Couldn't load your assets</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </section>
    );
  }
  return (
    <MyAssetList
      assets={myAssets}
      isLoading={isLoading}
      totalAssets={totalAssets}
    />
  );
}
