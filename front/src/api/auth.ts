import { AuthResponse, LoginDto, RegisterDto } from "../types/auth";
import { authFetch } from "./authFetch";

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  return authFetch("auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  return authFetch("auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
