export type AuthErrors = Partial<
  Record<"email" | "password" | "fullName", string | null>
>;

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

export interface CurrentSessionResponse {
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
    status: boolean;
  };
}

export type ChangePassword = {
  currentPassword: string;
  newPassword: string;
};

export interface ChangePasswordProps {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
}

export type ChangePasswordErrors = Partial<
  Record<"currentPassword" | "newPassword" | "confirmNewPassword", string>
>;