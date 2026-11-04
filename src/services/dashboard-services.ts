import { toCamelCase } from "@/lib/converters";
import type { AssetListResponse, AssetResponse } from "@/types/dashboard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export async function getAssetStats(): Promise<AssetResponse> {
  const result = await fetch(`${API_BASE_URL}/assets/stats`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response: AssetResponse = await result.json();
  const data = toCamelCase(response);
  return data;
}

export async function getWarrantyExpiringAssets(): Promise<AssetListResponse> {
  const result = await fetch(
    `${API_BASE_URL}/assets?warranty_expiry=expires_in_90_days&sort=warranty_expiry&order=asc`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "application/json",
      },
    },
  );
  const response: AssetListResponse = await result.json();
  const data = toCamelCase(response);
  return data;
}

export async function getRecentlyAddedAssets(): Promise<AssetListResponse> {
  const result = await fetch(
    `${API_BASE_URL}/assets?size=5&sort=created_at&order=desc`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        accept: "application/json",
      },
    },
  );
  const response: AssetListResponse = await result.json();
  const data = toCamelCase(response);
  return data;
}
