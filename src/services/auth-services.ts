import { toCamelCase, toSnakeCase } from "@/lib/converters";
import type { AuthResponse, ChangePassword, ChangePasswordProps, CurrentSessionResponse, LoginCredentials, SignUpCredentials } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCurrentSession(): Promise<CurrentSessionResponse> {
  const result = await fetch(`${API_BASE_URL}/users/me`, {
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

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const result = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const response = (await result.json()) as AuthResponse;
  return response;
}

export async function signUp(
  credentials: SignUpCredentials,
): Promise<AuthResponse> {
  const result = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(toSnakeCase(credentials)),
  });
  const response: AuthResponse = await result.json();
  const data = toCamelCase(response);
  return data;
}

export async function logout() {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return response;
}

export async function changePassword(
  payload: ChangePassword,
): Promise<ChangePasswordProps> {
  const response = await fetch(`${API_BASE_URL}/users/me/password`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(toSnakeCase(payload)),
  });
  console.log("response", response);
  const result = await response.json();
  console.log("result", result);
  const data = toCamelCase(result);
  return data;
}

export async function logoutAll() {
  const response = await fetch(`${API_BASE_URL}/auth/logout-all`, {
    method: "POST",
    credentials: "include",
  });
  return response;
}
