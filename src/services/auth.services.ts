const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface LoginCredentials {
  email: string | null;
  password: string | null;
}
export interface signUpCredentials {
  fullName: string | null;
  email: string | null;
  password: string | null;
}

export interface authResponse {
  success: boolean;
  status_code: number;
  message: string;
  errors?: { field: string; message: string }[];
}

export interface User {
  success: boolean;
  message: string;
  data: {
    id: string;
    full_name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
}
export interface refresh {
  refresh_token: string | null;
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
): Promise<authResponse> {
  const result = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const response = (await result.json()) as authResponse;
  return response;
}

export async function signUp(credentials: signUpCredentials): Promise<authResponse> {
  const signUpPayload = {
    full_name: credentials.fullName,
    email: credentials.email,
    password: credentials.password,
  };
  const result = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(signUpPayload),
  });
  const response = (await result.json()) as authResponse;
  return response;
}
