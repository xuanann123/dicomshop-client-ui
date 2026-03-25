import type { User, AuthResponse } from '../types/user';

export const mockUser: User = {
  id: 1,
  email: 'demo@pigeonshop.vn',
  firstName: 'Nguyễn',
  lastName: 'Văn A',
  phone: '0901234567',
  address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
  isActive: true,
  createdAt: '2026-01-15',
};

export const mockAuthResponse: AuthResponse = {
  token: 'mock-jwt-token-pigeon-shop-2026',
  user: mockUser,
};

export const DEMO_CREDENTIALS = {
  email: 'demo@pigeonshop.vn',
  password: 'demo123',
};
