import { toCamelCase } from "@/lib/converters";
import type { AssetListResponse } from "@/types/dashboard";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getMyAssets() {
  const result = await fetch(`${API_BASE_URL}/users/me/assets?page=1&size=20`, {
    method: "GET",
    credentials: "include",
    headers: { accept: "application/json" },
  });
  const response: AssetListResponse = toCamelCase(await result.json());
  return response;
}
