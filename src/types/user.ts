export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
