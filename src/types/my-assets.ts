import type { AssetListResponse } from "@/services/dashboard-services";

export type MyAsset = NonNullable<AssetListResponse["data"]>[number];

export interface MyAssetsProps {
  assets: MyAsset[];
  isLoading?: boolean;
  totalAssets: number;
}
