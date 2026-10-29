import { toCamelCase } from "@/lib/converters";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AssetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data?: {
    total: number;
    inStock: number;
    assigned: number;
    repair: number;
    retired: number;
  };
}

export interface AssetListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data?: {
    id: string;
    assetTag: string;
    type: string;
    warrantyExpiry: string;
    status: string;
    notes: string;
    warrantyExpiresInDays: string;
  }[];
}

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
