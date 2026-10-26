import { toCamelCase } from "@/lib/converters";
import type { AssetListResponse } from "./dashboard.services";
import type { AssetQuery } from "@/types/assets";

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

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface UsersResponse {
  success: boolean;
  StatusCode: number;
  message: string;
  data: User[];
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
