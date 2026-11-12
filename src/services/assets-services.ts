import { toCamelCase, toSnakeCase } from "@/lib/converters";
import type { AssetQuery, AssetStatus, UpdateAssetPayload, UpdateAssetResponse, UsersResponse } from "@/types/assets";
import type { AssetAttachmentData } from "@/components/dashboard/assets-components/view-asset-components/asset-attachment";
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
  const response = toCamelCase(await result.json());
  return response;
}

export type CreateFile = {
  filename: string;
  contentType: string;
  fileSize: number;
  checksumSha256: string;
};
export type CreateAssetFile = {
  fileId: string;
  uploadUrl: string;
  expiresIn: number;
  headers: Record<string, string>;
};

export type CreateAssetFileResponse = {
  type: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
  warrantyExpiry: string | null;
  notes: string | null;
  files: CreateAssetFile[];
};

export type CreateAssetPayload = {
  type: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
  warrantyExpiry?: string | null;
  notes: string | null;
  files: CreateFile[];
};

export interface createAssetResponse {
  success: boolean;
  StatusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data: CreateAssetFileResponse;
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
  const data = toCamelCase(response);
  return data;
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
  const response = await result.json();
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
  const data = toCamelCase(response);
  return data;
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
  const data = toCamelCase(response);
  return data;
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
  const data = toCamelCase(response);
  return data;
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
  const data = toCamelCase(response);
  return data;
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
  const response = toCamelCase(result);
  return response;
}
export type UploadUrlPayload = {
  filename: string;
  contentType: string;
  fileSize: number;
  checksumSha256: string;
};

export type GenerateUploadFile = {
  fileId: string;
  uploadUrl: string;
  expiresIn: number;
  headers: Record<string, string>;
};

export interface GenerateUploadUrlProps {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data: {
    files: GenerateUploadFile[];
  };
}

export async function generateUploadUrl(
  assetId: string,
  payload: UploadUrlPayload[],
): Promise<GenerateUploadUrlProps> {
  const result = await fetch(
    `${API_BASE_URL}/assets/${assetId}/files/presign`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSnakeCase({ files: payload })),
    },
  );
  const response = await result.json();
  const data = toCamelCase(response);
  return data;
}

type ApiError = { field: string; message: string };

export type GetFilesResponse = {
  success: boolean;
  message: string;
  errors?: ApiError[];
  data: AssetAttachmentData[];
};

export async function getFiles(assetId: string): Promise<GetFilesResponse> {
  const result = await fetch(`${API_BASE_URL}/assets/${assetId}/files`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      accept: "application/json",
    },
  });
  const response = await result.json();
  const data = toCamelCase(response);
  return data;
}

export async function deleteFile(assetId: string, fileId: string) {
  const result = await fetch(
    `${API_BASE_URL}/assets/${assetId}/files/${fileId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    },
  );
  return { success: result.ok };
}
