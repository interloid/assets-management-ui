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

export interface LoginResponse {
  success: boolean;
  status_code: number;
  message: string;
  errors?: { field: string; message: string }[];
}

export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse> {
  const result = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const response = (await result.json()) as LoginResponse;
  return response;
}

export async function signUp(credentials: signUpCredentials): Promise<void> {
  const signUpPayload = {
    full_name: credentials.fullName,
    email: credentials.email,
    password: credentials.password,
  };

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(signUpPayload),
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Invalid email or password.");
    }
    if (response.status === 422) {
      throw new Error("Please check the submitted information.");
    }
    if (response.status >= 500) {
      throw new Error("Server error. please try again later");
    }
    throw new Error("registration failed. try again later");
  }
}
