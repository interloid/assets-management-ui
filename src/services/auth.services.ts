import { toCamelCase, toSnakeCase } from "@/lib/converters";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginCredentials {
  email: string | null;
  password: string | null;
}
export interface SignUpCredentials {
  fullName: string | null;
  email: string | null;
  password: string | null;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
}

export interface User {
  success: boolean;
  message: string;
  statusCode: number;
  errors?: { field: string; message: string }[];
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export async function getCurrentSession(): Promise<User> {
  const result = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      accept: "application/json",
    },
  });
  const response = await result.json();
  return response;
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
