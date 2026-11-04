import type { AssetListResponse } from "./dashboard";

export type MyAsset = NonNullable<AssetListResponse["data"]>[number];

export interface MyAssetsProps {
  assets: MyAsset[];
  isLoading?: boolean;
  totalAssets: number;
}
