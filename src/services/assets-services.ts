import { toCamelCase, toSnakeCase } from "@/lib/converters";
import type { AssetQuery, AssetStatus, CreateAssetPayload, createAssetResponse, UpdateAssetPayload, UpdateAssetResponse, UsersResponse } from "@/types/assets";
import type { AssetListResponse } from "@/types/dashboard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAssetsData(
  query: AssetQuery,
): Promise<AssetListResponse> {
  const params = new URLSearchParams();

  if (query.status !== "all") {
    params.set("status", query.status);
  }

  if (query.search.trim()) {
    params.set("search", query.search.trim());
  }

  if (query.type !== "all") {
    params.set("type", query.type);
  }

  if (query.assignedUser !== "all") {
    params.set("assigned_to", query.assignedUser);
  }

  if (query.warrantyExpiry !== "all") {
    params.set("warranty_expiry", query.warrantyExpiry);
  }

  const [sort, order] = query.sort.split(":");

  if (sort && order) {
    params.set("sort", sort);
    params.set("order", order);
  }

  params.set("page", String(query.page));
  params.set("size", String(query.size));

  const result = await fetch(`${API_BASE_URL}/assets?${params.toString()}`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response: AssetListResponse = toCamelCase(await result.json());
  return response;
}


export async function getListUsers(): Promise<UsersResponse> {
  const result = await fetch(`${API_BASE_URL}/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response: UsersResponse = toCamelCase(await result.json());
  return response;
}



export async function getAssetsById(assetId: string) {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response = await result.json();
  return toCamelCase(response);
}

export async function createAsset(
  payload: CreateAssetPayload,
): Promise<createAssetResponse> {
  const result = await fetch(`${API_BASE_URL}/assets`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(toSnakeCase(payload)),
  });
  const response: createAssetResponse = await result.json();
  const data = toCamelCase(response);
  return data;
}

export async function assignAsset(assetId: string, userId: string) {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}/assign`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ user_id: userId }),
  });
  const response = await result.json();
  return toCamelCase(response);
}

export async function changeStatus(assetId: string, status: AssetStatus) {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}/status`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ status: status }),
  });

  const response = await result.json();
  return toCamelCase(response);
}

export async function unassignAsset(assetId: string) {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}/unassign`, {
    method: "POST",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response = await result.json();
  return toCamelCase(response);
}


export async function updateAsset(
  assetId: string,
  payload: UpdateAssetPayload,
): Promise<UpdateAssetResponse> {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(toSnakeCase(payload)),
  });
  const response = await result.json();
  return toCamelCase(response);
}

export async function deleteAsset(assetId: string) {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  });

  if (result.status === 204) {
    return { success: true, message: "Asset deleted successfully." };
  }

  const response = await result.json();
  return toCamelCase(response);
}
