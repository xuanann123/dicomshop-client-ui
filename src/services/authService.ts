import type { LoginRequest, RegisterRequest, AuthResponse } from '../types/user';
import { mockAuthResponse, DEMO_CREDENTIALS } from '../mock/users';
import { delay } from '../utils/helpers';

// Mock auth service - sẽ thay bằng API thật sau
export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    await delay(800);

    if (
      data.email === DEMO_CREDENTIALS.email &&
      data.password === DEMO_CREDENTIALS.password
    ) {
      return mockAuthResponse;
    }

    throw new Error('Email hoặc mật khẩu không đúng');
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    await delay(1000);

    if (data.email === DEMO_CREDENTIALS.email) {
      throw new Error('Email đã được sử dụng');
    }

    return {
      token: 'mock-jwt-token-new-user',
      user: {
        id: 2,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        isActive: true,
        createdAt: new Date().toISOString(),
      },
    };
  },
};
