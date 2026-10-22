const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface AssetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data?: {
    total: number;
    in_stock: number;
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
    id: string; assetTag: string; type: string; warrantyExpiry: string; status:string;
  }
}

export async function getAssetStats(): Promise<AssetResponse> {
  const result = await fetch(`${API_BASE_URL}/assets/stats`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response = (await result.json()) as AssetResponse;
  return response;
}

export async function getWarrantyStats(): Promise<AssetListResponse> {
    const result = await fetch(`${API_BASE_URL}/assets?warranty_expiry=expires_in_90_days&sort=warranty_expiry&order=asc`, {
        method: "GET",
        credentials: "include",
        headers: {
            accept: "application/json",
        },
    });
    const response = (await result.json()) as AssetListResponse;
    return response
}
